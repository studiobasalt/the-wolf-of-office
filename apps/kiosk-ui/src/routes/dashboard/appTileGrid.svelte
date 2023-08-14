<script lang="ts">
    // Define an array of app tiles
    export let appTiles:AppTileItem[] = [];
</script>
  
  <div class="grid">
    <!-- Loop through the app tiles and render each one -->
    {#each appTiles as appTile}
      <a href={appTile.link} class="tile">
        <img src={appTile.icon} alt="" />
        <span>{appTile.title}</span>
      </a>
    {/each}
  </div>
  
  <style lang="scss">
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      justify-items: center;
      align-items: center;
      padding: 20px;
    }

    img {
      width: 30px;
      height: 30px;
      margin-bottom: 10px;
    }
  
    /* Style the app tiles */
    .tile {
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f2f2f2;
      border-radius: 10px;
      height: 60px;
      width: 100%;
      text-decoration: none;
      color: #333;
      transition: all 0.2s ease-in-out;
      &:hover {
        background-color: #ddd;
        transform: translateY(-5px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        }
    }
  
    /* Style the title */
    span {
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      max-width: 80%;
    }
  </style>