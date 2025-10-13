const imgArray = ["game-of-life.png", "3d-game.png", "sudoku.jpg", "chess.png", "low-poly-world.png", "3d-objects.png"];

class Galery {
  index = 0;
  arrLen; 

  constructor(imgGalerySelector, imgViewerSelector, background, imgArray){
    if(imgArray.length < 1){
      throw 'Error: gallery array length < 1';
    };
    this.arrLen = imgArray.length;

    this.imgGalerySelector = imgGalerySelector;
    this.imgViewerSelector = imgViewerSelector;
    this.backgroundSelector = background;
    this.imgArray = imgArray;
    this.imgGaleryElement = document.querySelector(imgGalerySelector);
    this.imgViewerElement = document.querySelector(imgViewerSelector);
    this.backgroundElement = document.querySelector(background);

    //generate galery and put it on page (remove first # (used in js but not in html id=""))
    let html = '';
    for(let i = 0; i < this.arrLen; i++){
      html += `<img id="${imgGalerySelector.replace('#', '')}-img-${i}" src="${imgArray[i]}" alt="${imgArray[i].replaceAll('-', ' ')}">`;
    };
    this.imgGaleryElement.innerHTML = html;

    //add event listeners to galery
    for(let i = 0; i < this.arrLen; i++){
      document.querySelector(`${imgGalerySelector}-img-${i}`).addEventListener('click', ()=>{
        this.index = i;
        this.openGalery();
      });
    };

    //close on background click
    this.backgroundElement.addEventListener('click', () => {
      this.closeGalery();
    });

    //connect buttons
    document.querySelector(`${imgViewerSelector} .imgPrev`).addEventListener('click', () => {
      this.prevGalery();
    });
    document.querySelector(`${imgViewerSelector} .imgNext`).addEventListener('click', () => {
      this.nextGalery();
    });
  };

  updateNumber(n){
    document.querySelector(`${this.imgViewerSelector} p`).innerText = `${n+1} of ${this.arrLen} images`;
  };

  openGalery(){
    //load/update page/data
    document.querySelector(`${this.imgViewerSelector} img`).src = imgArray[this.index];
    document.querySelector(`${this.imgViewerSelector} img`).alt = imgArray[this.index].replaceAll('-', ' ');
    document.querySelector(`${this.imgViewerSelector} img`).addEventListener('click', () => {
      this.nextGalery();
    })

    //activate element
    this.backgroundElement.style.visibility = 'visible';
    this.imgViewerElement.style.visibility = 'visible';
    this.updateNumber(this.index);
  };

  closeGalery(){
    document.querySelector(`${this.imgViewerSelector} img`).src = '';
    document.querySelector(`${this.imgViewerSelector} img`).alt = '';

    this.backgroundElement.style.visibility = 'hidden';
    this.imgViewerElement.style.visibility = 'hidden';
  };

  prevGalery(){
    this.index = (((this.index-1) % this.arrLen) + this.arrLen) % this.arrLen;
    this.openGalery();
  };

  nextGalery(){
    this.index = (this.index+1) % this.arrLen;
    this.openGalery();
  };
};
const galery = new Galery('#imgGalery', '#imageViewer', '#backgroundDark', imgArray);