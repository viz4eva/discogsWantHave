import {writable} from 'svelte/store';

export const focus = writable({
    title: 'init',
    in_wantlist: 'init',
    in_collection: 'init',
    uri: 'init'
});

export const sheet = writable(0);