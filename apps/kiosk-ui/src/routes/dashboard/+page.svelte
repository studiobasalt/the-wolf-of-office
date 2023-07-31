<script lang="ts">
    import AppTileGrid from './appTileGrid.svelte';

    const gridItems = [
        {
            title: 'My Account',
            icon: '/account.svg',
            link: '/dashboard/my-profile',
        },
        {
            title: 'Accounts Management',
            icon: '/account-group.svg',
            link: '/dashboard/accounts-management'
        },
        {
            title: 'Kiosk Screens',
            icon: '/content.svg',
            link: '/dashboard/kiosk-screens'
        },
        {
            title: 'Device Settings',
            icon: '/device.svg',
            link: '/dashboard/this-device'
        },
        {
            title: 'Play Kiosk',
            icon: '/play.svg',
            link: '/'
        }
    ];
</script>

<AppTileGrid appTiles={gridItems} />
