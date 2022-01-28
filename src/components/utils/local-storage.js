const now  = () => (new Date()).getTime();

export const getFromLocalStorage = (key) => {
    let  entry = window.localStorage.getItem(key);
    if (!entry || entry == undefined || entry == "undefined" ) {
        return null;
    }
    let entry_data = JSON.parse(entry);
    console.log("Reading etry from local storage", entry_data.now);
    let expiry = entry_data.now  + entry_data.ttl;

    if (entry_data.ttl && expiry < now()) {
        window.localStorage.removeItem(key);
        return null;
    }
    return entry_data.value;
} 

export const setLocalStorage = (key, value, ttl) => {

    window.localStorage.setItem( key, JSON.stringify({
        ttl   : ttl || 0,
        now   : now(),
        value : value
    }));
} 
export const removeItem = (key) => {
    window.localStorage.removeItem(key);
}
