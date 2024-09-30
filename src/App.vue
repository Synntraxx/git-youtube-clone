<template>
  <div id="app">
    <h1>Top Tendances en France</h1>
    <div v-if="videos.length">
      <div v-for="(video, index) in videos" :key="index" class="video-card">
        <h3>{{ video.title }}</h3>
        <!-- Affiche l'URL de l'image pour déboguer -->
        <p>{{ video.thumbnailUrl }}</p>
        <!-- Image de la vignette -->
        <img :src="video.thumbnailUrl" alt="thumbnail" />
        <p>{{ video.views }} vues</p>
        <a :href="'https://youtube.com/watch?v=' + video.videoId" target="_blank">Regarder sur YouTube</a>
      </div>
    </div>
    <div v-else>
      <p>Chargement des vidéos...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      videos: [],
    };
  },
  mounted() {
    this.getTrendingVideos();
  },
  methods: {
    async getTrendingVideos() {
      try {
        const response = await axios.get('http://localhost:3000/api/trending');
        this.videos = response.data.map(video => ({
          title: video.title,
          thumbnailUrl: video.thumbnailUrl, // Vérifie cette partie
          videoId: video.videoId,
          views: video.views,
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des vidéos:', error);
      }
    },
  },
};
</script>

<style>
#app {
  text-align: center;
}

.video-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  display: inline-block;
  text-align: left;
}

img {
  max-width: 100%;
}
</style>