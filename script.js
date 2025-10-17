const imgArray = ["game-of-life.png", "3d-game.png", "sudoku.jpg", "chess.png", "low-poly-world.png", "3d-objects.png"];

class Gallery {
  index = 0;
  arrLen; 

  constructor(imgGallerySelector, imgViewerSelector, background, imgArray){
    if(imgArray.length < 1){
      throw 'Error: gallery array length < 1';
    };
    this.arrLen = imgArray.length;

    this.imgGallerySelector = imgGallerySelector;
    this.imgViewerSelector = imgViewerSelector;
    this.backgroundSelector = background;
    this.imgArray = imgArray;
    this.imgGalleryElement = document.querySelector(imgGallerySelector);
    this.imgViewerElement = document.querySelector(imgViewerSelector);
    this.backgroundElement = document.querySelector(background);

    //generate gallery and put it on page (remove first # (used in js but not in html id=""))
    let html = '';
    for(let i = 0; i < this.arrLen; i++){
      html += `<img id="${imgGallerySelector.replace('#', '')}-img-${i}" src="${imgArray[i]}" alt="${imgArray[i].replaceAll('-', ' ')}">`;
    };
    this.imgGalleryElement.innerHTML = html;

    //add event listeners to gallery
    for(let i = 0; i < this.arrLen; i++){
      document.querySelector(`${imgGallerySelector}-img-${i}`).addEventListener('click', ()=>{
        this.index = i;
        this.openGallery();
      });
    };

    //close on background click
    this.backgroundElement.addEventListener('click', () => {
      this.closeGallery();
    });

    //connect buttons
    document.querySelector(`${imgViewerSelector} .imgPrev`).addEventListener('click', () => {
      this.prevGallery();
    });
    document.querySelector(`${imgViewerSelector} .imgNext`).addEventListener('click', () => {
      this.nextGallery();
    });

    document.querySelector(`${this.imgViewerSelector} img`).addEventListener('click', () => {
      this.nextGallery();
    })
  };

  updateNumber(n){
    document.querySelector(`${this.imgViewerSelector} p`).innerText = `${n+1} of ${this.arrLen} images`;
  };

  openGallery(){
    //load/update page/data
    document.querySelector(`${this.imgViewerSelector} img`).src = imgArray[this.index];
    document.querySelector(`${this.imgViewerSelector} img`).alt = imgArray[this.index].replaceAll('-', ' ');

    //activate element
    this.backgroundElement.style.visibility = 'visible';
    this.imgViewerElement.style.visibility = 'visible';
    this.updateNumber(this.index);
  };

  closeGallery(){
    document.querySelector(`${this.imgViewerSelector} img`).src = '';
    document.querySelector(`${this.imgViewerSelector} img`).alt = '';

    this.backgroundElement.style.visibility = 'hidden';
    this.imgViewerElement.style.visibility = 'hidden';
  };

  prevGallery(){
    this.index = (((this.index-1) % this.arrLen) + this.arrLen) % this.arrLen;
    this.openGallery();
  };

  nextGallery(){
    this.index = (this.index+1) % this.arrLen;
    this.openGallery();
  };
};
const gallery = new Gallery('#imgGallery', '#imageViewer', '#backgroundDark', imgArray);