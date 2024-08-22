async function search(place) {
    const key = "nP5HFpFuMA454E-URpH1JMEtXj8qPMSKr0PhfWxoPLQ";
        
    try {
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${place}&orientation=landscape&client_id=${key}`;
      const response = await axios.get(url);
      const data = response.data;
      if (response.status === 200) {
        const images = data.results.map(result => result.urls.regular);
        return images;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      return null;
    } 
}

export default search