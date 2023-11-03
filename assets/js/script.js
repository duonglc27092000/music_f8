const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const cd = $(".cd");

const PLAYER_STORAGE_KEY = 'D7CF_PLAYER'
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const ramdomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRamdom: false,
  isLoop: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [{
      name: "Suy Nghĩ Trong Anh",
      singer: "Khắc Việt",
      path: "./assets/music/song1.mp3",
      image: "./assets/img/img1.jfif",
    },
    {
      name: "Anh Muốn Quay Lại",
      singer: "Khắc Việt",
      path: "./assets/music/song7.mp3",
      image: "./assets/img/img7.jfif",
    },
    {
      name: "đơn giản anh yêu em",
      singer: "Hồ Quốc Việt",
      path: "./assets/music/dongiananhyeuem.mp3",
      image: "./assets/img/dongiananhyeuem.webp",
    },
    {
      name: "Ngoài 30",
      singer: "Nguyễn Thái Học",
      path: "./assets/music/ngoai30.mp3",
      image: "./assets/img/ngoai30.webp",
    },
    {
      name: "Sắp 30",
      singer: "Trịnh Đình Quang",
      path: "./assets/music/sap30.mp3",
      image: "./assets/img/sap30.webp",
    },
    {
      name: "Ngày Mai người ta cưới",
      singer: "Thành Đạt x Đông Thiên Đức",
      path: "./assets/music/ngaymainguoitacuoi.mp3",
      image: "./assets/img/ngaymainguoitacuoi.webp",
    },
    {
      name: "Rượu Mừng Hóa Người Dưng",
      singer: "TLong",
      path: "./assets/music/ruoumunghoanguoidung.mp3",
      image: "./assets/img/ruoumunghoanguoidung.webp",
    },

  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
  },

  render() {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="song ${index === this.currentIndex ? "active" : ""}" data-index ="${index}">
            <div class="thumb " style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            ${
              index === this.currentIndex
                ? ` <div class="d1">
            <div></div>
        </div>`
                : ""
            }
           
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
            
        </div>
      `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get() {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvent() {
    const cdWidth = cd.offsetWidth;
    const _this = this;
    audio.play();
    //Xử lý CD quay / dừng
    const cdThumbAnimate = cdThumb.animate(
      [{
        transform: "rotate(360deg)",
      }, ], {
        duration: 50000,
        iterations: Infinity,
      }
    );
    cdThumbAnimate.pause();
    // Xử lý Phóng To / Thu Nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử Lý khi Click Play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi Song Play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    //Khi Song pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    //khi Tiến Độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    // Xử lý khi tua
    progress.onchange = function (e) {
      console.log((audio.duration / 100) * e.target.value);
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    // Xử lý khi chuyển tiếp Song
    nextBtn.onclick = function () {
      if (_this.isRamdom) {
        _this.playRamdomSong();
      }
      _this.nextSong();
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    // Xử lý khi quay lai Song
    prevBtn.onclick = function () {
      if (_this.isRamdom) {
        _this.playRamdomSong();
      }
      _this.prevSong();

      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    // Xu Ly next Song khi audio end
    audio.onended = function () {
      _this.isLoop ? audio.play() : nextBtn.click(); // or repalce audio.play() == // nextBtn.click(); // prevBtn.click();
    };

    //Khi Ramdom Song
    ramdomBtn.onclick = function () {
      _this.isRamdom = !_this.isRamdom;
      _this.setConfig('isRamdom', _this.isRamdom)
      ramdomBtn.classList.toggle("active", _this.isRamdom);
    };
    //Khi Repeat Song
    repeatBtn.onclick = function () {
      _this.isLoop = !_this.isLoop;
      _this.setConfig('isLoop', _this.isLoop)
      repeatBtn.classList.toggle("active", _this.isLoop);
    };
    // Lắng nghe hành vi click playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        //xử lý khi click Song
        if (songNode) {
          //  console.log(songNode.getAttribute("data-index"))

          _this.currentIndex = Number(songNode.getAttribute("data-index"));
          // _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong()
          _this.render();
          audio.play();
        }
        //Xu ly khi click option
        if (e.target.closest(".option")) {
          alert('hihi')
        }
      }
    };
    // Xu ly input Keyboard

    document.onkeydown = function (e) {
      switch (e.keyCode) {
        case 32: {
          //  Play | Pause Song
          if (_this.isPlaying) {
            audio.pause();
          } else {
            audio.play();
          }
          break;
        }
        case 37:
        case 80:
          // Prev Song
          if (_this.isRamdom) {
            _this.playRamdomSong();
          }
          _this.prevSong();

          audio.play();
          _this.render();
          _this.scrollToActiveSong();

          break;
        case 39:
        case 78:
          // Next Song
          if (_this.isRamdom) {
            _this.playRamdomSong();
          }
          _this.nextSong();

          audio.play();
          _this.render();
          _this.scrollToActiveSong();

          break;
        case 76: {
          //Loop Song
          _this.isLoop = !_this.isLoop;
          repeatBtn.classList.toggle("active", _this.isLoop);
          break;
        }
        case 82: {
          //Ramdom Song
          _this.isRamdom = !_this.isRamdom;
          ramdomBtn.classList.toggle("active", _this.isRamdom);
          break;
        }
      }
    };
  },
  getCurrentSong() {
    return this.songs[currentIndex];
  },
  hightlightSong() {
    let songBlock = $$(".song");
    for (var i = 0; i < songBlock.length; i++) {
      songBlock[i].classList.remove("active");
    }
    songBlock[this.currentIndex].classList.add("active");
  },
  nextSong() {
    this.currentIndex++;
    if (this.songs.length - this.currentIndex == 0) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  loadCurrentSong() {
    heading.textContent = this.currentSong.name;
    cdThumb.style.background = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  playRamdomSong() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  scrollToActiveSong() {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);
  },
  loadConfig() {
    this.isRamdom = this.config.isRamdom
    this.isLoop = this.config.isLoop
  },
  start() {
    //gán từ cònig vào object
    this.loadConfig()
    // Định nghĩa các thuộc tính cho Object
    this.defineProperties();

    // this.getcurrentSong();

    // Lắng Nghe / Xử lý các Sự Kiện (DOM Events)
    this.handleEvent();

    //Tải Bài Hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();
    // this.hightlightSong();
    // Render playlist
    this.render();
    // 
    ramdomBtn.classList.toggle("active", this.isRamdom);
    repeatBtn.classList.toggle("active", this.isLoop);

  },
};

app.start();