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
  isMute: false,
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
    // image: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/425511423_917740453402385_4334854870343985158_n.jpg?stp=dst-jpg_p960x960&_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=Z7YTIBMk2DMAX-PkwOV&_nc_oc=AQnNuMyMxEKg4Mab8o-_b8xlMnWUXJf9ySEB7Lh4HbsKzp1hp6f9aG0FTcq5HofcyoQ&_nc_ht=scontent.fhan2-3.fna&oh=00_AfBMPr4Rpz_l2IfB7o7wns-FtPct1l94EmWlVSK3HSQ87A&oe=65C18B84",
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
  {
    name: "Chỉ còn lại những mùa nhớ",
    singer: "Hà Anh Tuấn",
    path: "./assets/music/chiconnuoitiecnhungmuanho.mp3",
    image: "./assets/img/chiconnuoitiecnhungmuanho.webp",
  },
  {
    name: "chưa quên người yêu cũ",
    singer: "Hà Nhi",
    path: "./assets/music/chuaquennguoiyeucu.mp3",
    image: "./assets/img/chuaquennguoiyeucu.webp",
  },
  {
    name: "em là kể đáng thương",
    singer: "Phát Huy T4",
    path: "./assets/music/emlakedangthuong.mp3",
    image: "data:image/jpeg;base64,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",
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
            ${index === this.currentIndex
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
    audio.play()
    //Xử lý CD quay / dừng
    const cdThumbAnimate = cdThumb.animate(
      [{
        transform: "rotate(360deg)",
      },], {
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
      // chuyen dong song nhac khi nhac duoc chay
      document.querySelector('.d1 div').style.setProperty('--pseudo', 'running')

      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    //Khi Song pause
    audio.onpause = function () {
      _this.isPlaying = false;
      // dung song nhac khi nhac dung
      document.querySelector('.d1 div').style.setProperty('--pseudo', 'paused')

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
        case 77: {
          //mute Song
          _this.isMute = !_this.isMute
          audio.muted = _this.isMute
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