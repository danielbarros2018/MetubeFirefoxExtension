const CONFIG = {
    SERVER_ADDRESS: '192.168.1.2:8083',
    BADGE_RESPONSE_TIMEOUT: 5000,
    VIDEO_QUALITY: 'best',
    VISEO_FORMAT: 'mp4'
}

const COLORS = {
    WAITING: "#FFD700",
    SUCCESS: "#00FF00",
    ERROR: "#FF0000",
    INVISIBLE: [0, 0, 0, 0]
};

function updateActionState(tabId, url) {
    if (url && url.includes("youtube.com")) {
        browser.action.enable(tabId);
        return;
    }
    browser.action.disable(tabId);
}

async function init() {
    const allTabs = await browser.tabs.query({});

    for (const tab of allTabs) {
        updateActionState(tab.id, tab.url);
    }
}

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url || changeInfo.status === 'complete') {
        updateActionState(tabId, tab.url);
    }
});

browser.tabs.onActivated.addListener(async function(activeInfo) {
    const tab = await browser.tabs.get(activeInfo.tabId);
    updateActionState(activeInfo.tabId, tab.url);
})

async function setFeedback(tabId, color, text) {
    await browser.action.setBadgeBackgroundColor({ color: color, tabId });
    await browser.action.setBadgeText({ text: text, tabId });

    setTimeout(async () => {
       await browser.action.setBadgeText({ text: "", tabId });
    }, 5000);
}

browser.action.onClicked.addListener(async (tab) => {
    const tabId = tab.id;
    const url = tab.url;

    try {
        await browser.action.setBadgeBackgroundColor({ color: COLORS.WAITING, tabId });
        await browser.action.setBadgeText({ text: "Wait", tabId });

        const response = await fetch('https://' + CONFIG.SERVER_ADDRESS + '/add', {
            method: 'POST',
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "url": url,
                "quality": CONFIG.VIDEO_QUALITY,
                "format": CONFIG.VISEO_FORMAT
            })
        });

        if (response.status == 200) {
            await setFeedback(tabId, COLORS.SUCCESS, "OK");
        } else {
            await setFeedback(tabId, COLORS.ERROR, "ERR");
        }

    } catch (error) {
        console.error("Erro: ", error);
        await setFeedback(tabId, COLORS.ERROR, "OFF");
    }
});

init();
