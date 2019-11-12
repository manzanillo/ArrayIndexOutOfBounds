export function host(url) {
    const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    const parts = host.split('.').slice(-3);
    if(parts[0] === 'www') parts.shift();
    return parts.join('.');
}

export function timeAgo(time) {
    var date = new Date(time);
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if(interval > 1) {
        return `${interval} Jahren`;
    }
    interval = Math.floor(seconds / 2592000);
    if(interval > 1) {
        return `${interval} Monaten`;
    }
    interval = Math.floor(seconds / 86400);
    if(interval > 1) {
        return `${interval} Tagen`;
    }
    interval = Math.floor(seconds / 3600);
    if(interval > 1) {
        return `${interval} Stunden`;
    }
    interval = Math.floor(seconds / 60);
    if(interval > 1) {
        return `${interval} Minuten`;
    }
    return `${Math.floor(seconds)} Sekunden`;
}

function pluralize(time, label) {
    if(time === 1) {
        return time + label;
    }
    return `${time + label}s`;
}

function compare(a, b) {
    if(a.createdAt > b.createdAt) {
        return -1;
    }
    if(a.createdAt < b.createdAt) {
        return 1;
    }
    return 0;
}

function compareVotes(a, b) {
    if(a.votes > b.votes) {
        return -1;
    }
    if(a.votes < b.votes) {
        return 1;
    }
    return 0;
}

export function sortCreatedAt(objs) {
    return objs.sort(compare);
}

export function sortVotes(objs) {
    return objs.sort(compareVotes);
}
