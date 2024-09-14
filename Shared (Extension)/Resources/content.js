var inputChecks = null;
var inputName, inputId, inputEmail;

window.onload = async () => {
    let t = document.documentElement.textContent;
    if(!t.includes('GameIDでのお名前') ||
       !t.includes('GameID番号') ||
       !t.includes('連絡用メールアドレス') ||
       !t.includes('ご同意お願いします。')){
        return;
    }
    const listItems = document.querySelectorAll('.Qr7Oae');
    for(let item of listItems) {
        let p = item.childNodes[0].dataset.params;
        if(p.includes('GameIDでのお名前')){
            console.log('GameName');
            inputName =item.querySelector('.whsOnd.zHQkBf');
        } else if(p.includes('GameID番号')){
            console.log('GameID');
            inputId = item.querySelector('.whsOnd.zHQkBf')
        } else if(p.includes('連絡用メールアドレス')){
            console.log('email');
            inputEmail = item.querySelector('.whsOnd.zHQkBf');
        }
    }
    
    let saveData = await chrome.storage.local.get('PokerGameID');

    if(location.search) {
        if(location.search.includes('fbzx=')) {
            location.href = `${location.origin}${location.pathname}`;
            return;
        }
        console.log(location.search && !location.search.includes('fbzx='));
        const listItems = document.querySelectorAll('.Qr7Oae');
        for(let item of listItems) {
            let p = item.childNodes[0].dataset.params;
            if(p.includes('ご同意お願いします。')){
                console.log('check');
                inputChecks = item.querySelectorAll('.docssharedWizToggleLabeledContainer');
            }
        }
        setTimeout(() => {
            console.log('test');
            inputChecks.forEach(x => x.click());
            //document.querySelector('.NPEfkd.RveJvd.snByac').click();
        }, 20);
    } else {
        if(Object.keys(saveData).length) {
            let gameName = saveData.PokerGameID.GameName;
            let gameId = saveData.PokerGameID.GameID;
            let gameEmail = saveData.PokerGameID.GameEmail;
            console.log(`gameName: ${gameName}, gameId: ${gameId}, gameEmail: ${gameEmail}`);
            // このURLアクセスでフォームの各項目に値をセット
            let newURL = `${location.href}?usp=pp_url&entry.959285622=${gameName}&entry.830846364=${gameId}&entry.328721307=${gameEmail}`;;
            console.log(`newURL: ${newURL}`);
            location.href = newURL;
        }
    }
    
    let btn = document.querySelector('div[role="button"]');
    let button = document.createElement('button');
    button.style.fontSize = '13px';
    button.style.borderRadius = '4px';
    button.style.color = 'white';
    button.style.width = btn.style.width;
    // if(Object.keys(saveData).length) {
    //     button.style.backgroundColor = 'rgb(147, 50, 60)';
    //     button.textContent = '削除';
    //     button.onclick = async evt => {
    //         await chrome.storage.local.clear();
    //         location.href = `${location.origin}${location.pathname}`;
    //     };
    //     setTimeout(() => {
    //         inputChecks.forEach(x => x.click());
    //     }, 20);
    // } else {
        button.style.backgroundColor = 'rgb(60, 147, 50)';
        button.onclick = async evt => {
            await chrome.storage.local.clear();
            const listItems = document.querySelectorAll('.Qr7Oae');
            for(let item of listItems) {
                let p = item.childNodes[0].dataset.params;
                if(p.includes('GameIDでのお名前')){
                    console.log('GameName');
                    inputName =item.querySelector('.whsOnd.zHQkBf');
                } else if(p.includes('GameID番号')){
                    console.log('GameID');
                    inputId = item.querySelector('.whsOnd.zHQkBf')
                } else if(p.includes('連絡用メールアドレス')){
                    console.log('email');
                    inputEmail = item.querySelector('.whsOnd.zHQkBf');
                }
            }
            await chrome.storage.local.set({PokerGameID:{
                GameName: inputName.value,
                GameID: inputId.value,
                GameEmail: inputEmail.value
            }});
            location.reload();
        };
        button.textContent = '保存';
    // }
    btn.parentElement.insertBefore(button, btn.nextSibling);
};
