class ExternalDataComponent extends HTMLElement {
    constructor() {
      super();
      this.imageList = [];
      this.currentIndex = 0;
    }
  
    connectedCallback() {
      this.getDataFromAPI();
    }
  
    getDataFromAPI() {
      fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          return response.json();
        })
        .then(data => {
          this.imageList = data.map(item => item.url);
          this.displayNextImage();
          setInterval(() => this.displayNextImage(), 5000);
        })
        .catch(error => console.error(error));
    }
  
    displayNextImage() {
      const imageUrl = this.imageList[this.currentIndex];
      this.innerHTML = `<img src="${imageUrl}" alt="Random Cat Image">`;
      this.currentIndex = (this.currentIndex + 1) % this.imageList.length;
    }
  }
  
  customElements.define('external-data-component', ExternalDataComponent);
  