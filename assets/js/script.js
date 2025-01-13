



// ----------------------------------------------
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
    name: "AI CHUNG TÌNH ĐƯỢC MÃI",
    singer: "TRUNG QUÂN COVER",
    path: "./assets/music/AI CHUNG TÌNH ĐƯỢC MÃI dinhtunghuy8765  TRUNG QUÂN COVER  In the Moonlight 2022_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "ÁNH SAO  BẦU TRỜI",
    singer: "TRUNG QUÂN COVER",
    path: "./assets/music/ÁNH SAO  BẦU TRỜI  Trung Quân x CÁ x TRI  Live at Soul of the forest_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "BUỒN KHÔNG THỂ BUÔNG",
    singer: "TRUNG QUÂN COVER",
    path: "./assets/music/BUỒN KHÔNG THỂ BUÔNG  Trung Quân live at Soul of The Forest_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "Chia Cách Bình Yên",
    singer: "Quốc Thiên",
    path: "./assets/music/Chia Cách Bình Yên  Quốc Thiên live at souloftheforest_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "CÔ ĐƠN TRÊN SOFA",
    singer: "TRUNG QUÂN COVER",
    path: "./assets/music/CÔ ĐƠN TRÊN SOFA  Hồ Ngọc Hà x Tăng Duy Tân  Trung Quân live cover at Soul of The Forest_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "HÔM NAY ANH RÂT MÊT",
    singer: "TRUNG QUÂN COVER",
    path: "./assets/music/HÔM NAY ANH RÂT MÊT  Trung Quân x Nguyễn Văn Chung  Live at Soul of The Forest_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "HƠN EM CHỖ NÀO",
    singer: "TRUNG QUÂN COVER",
    path: "./assets/music/HƠN EM CHỖ NÀO  Viruss x Thuỳ Chi  Trung Quân live cover at Soul of The Forest_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "LK Katy Katy  Vì Yêu",
    singer: "Lân Nhã",
    path: "./assets/music/LK Katy Katy  Vì Yêu  Lân Nhã live at souloftheforest_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "Mashup NHỮNG CÂU HỎI KHI SAY  DỪNG YÊU",
    singer: "TRUNG QUÂN x MYRA TRẦN",
    path: "./assets/music/Mashup NHỮNG CÂU HỎI KHI SAY  DỪNG YÊU l TRUNG QUÂN x MYRA TRẦN  Live at LULULOLA_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "MỐI TÌNH KHÔNG TÊN",
    singer: "TRUNG QUÂN COVER",
    path: "./assets/music/MỐI TÌNH KHÔNG TÊN l TRUNG QUÂN x ĐÌNH NGUYỄN x LÊ CHÍ TRUNG  Live cover at LULULOLA_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "Một Ngàn Nỗi Đau",
    singer: "TRUNG QUÂN COVER",
    path: "./assets/music/Một Ngàn Nỗi Đau  TrungQuanSinger live at souloftheforest  St FinoKim0801_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "NGƯỜI LẠ THOÁNG QUA",
    singer: "TRUNG QUÂN COVER",
    path: "./assets/music/NGƯỜI LẠ THOÁNG QUA  Trung Quân x Đinh Tùng Huy  Live at Soul of the forest_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "THUYỀN QUYÊN",
    singer: "TRUNG QUÂN COVER",
    path: "./assets/music/THUYỀN QUYÊN  Trung Quân x Diệu Kiên  Live cover at La Cà Hát Ca 2023_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "TÌNH SÂU ĐẬM MƯA MỊT MÙ",
    singer: "TRUNG QUÂN COVER",
    path: "./assets/music/TÌNH SÂU ĐẬM MƯA MỊT MÙ  OST Romance in the Rain x PP Nguyễn  Trung Quân live at Soul of TheForest_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "TRÁI TIM BÊN LỀ",
    singer: "Trung Quân  Bùi Anh Tuấn cover",
    path: "./assets/music/TRÁI TIM BÊN LỀ  Trung Quân  Bùi Anh Tuấn cover ngẫu hứng theo yêu cầu khán giả tại Mey_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "TỰ TÌNH 2",
    singer: "TRUNG QUÂN COVER",
    path: "./assets/music/TỰ TÌNH 2  Lâm Nguyên  Trung Quân Cover  souloftheforest_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "VẪN NHỚ",
    singer: "HÀ NHI COVER",
    path: "./assets/music/VẪN NHỚ  HÀ NHIs.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "YÊU NGƯỜI CÓ ƯỚC MƠ",
    singer: "TRUNG QUÂN COVER",
    path: "./assets/music/YÊU NGƯỜI CÓ ƯỚC MƠ  Trung Quân x Bùi Trường Linh  Live cover at Isle of Art_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "AI RỒI CŨNG SẼ KHÁC ",
    singer: "HÀ NHI COVER",
    path: "./assets/music/yt1s.com - AI RỒI CŨNG SẼ KHÁC  HÀ NHI  LIVE VERSION AT GIAO LỘ THỜI GIAN_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "Dẫu Có Lỗi Lầm",
    singer: "BÙI CÔNG NAM ft TRUNG QUÂN",
    path: "./assets/music/yt1s.com - BÙI CÔNG NAM ft TRUNG QUÂN   Dẫu Có Lỗi Lầm  Sáng tác Hồ Hoài Anh  Live in MAY SAI GON_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "Lao Tâm Khổ Tứ",
    singer: "Thanh Hưng",
    path: "./assets/music/yt1s.com - Lao Tâm Khổ Tứ  Thanh Hưng Official MV_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "Xin Lỗi",
    singer: "Nguyên Hà",
    path: "./assets/music/yt1s.com - Xin Lỗi  Nguyên Hà live at souloftheforest_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "Mơ Băng Giá",
    singer: "Noo Phước Thịnh COVER",
    path: "./assets/music/Noo Phước Thịnh COVER Cơn Mơ Băng Giá LIVE  Mây in the Nest_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "Không Bằng",
    singer: "Hà Nhi",
    path: "./assets/music/Hà Nhi  Không Bằng  Khi người buông tay nhưng em vẫn còn yêu_320kbps.mp3",
    image: "./assets/img/i1.jpg",
  },
  {
    name: "Vì Em Chưa Bao Giờ Khóc",
    singer: "Hà Nhi",
    path: "./assets/music/Hà Nhi  Vì Em Chưa Bao Giờ Khóc  AC Xuân Tài I Official Music Video_320kbps.mp3",
    image: "./assets/img/i1.jpg",
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
      // Lấy file, audio và canvas element
      // var fileElm = document.querySelector("#input-file");
      // var audioElm = document.querySelector("#audio");
      var canvasElm = document.querySelector("#canvas");
      canvasElm.width = window.innerWidth;
      canvasElm.height = window.innerHeight;

      // Thực hiện xử lý khi một file audio được chọn
      audio.onplay = function () {
        // Gắn đường source cho audio element với file đầu tiên trong danh sách các file đã chọn
        // File object thường là 1 array do input type file có thể chấp nhận thuộc tính multple
        // để chúng ta có thể chọn nhiều hơn một file. URL.createObjectURL sẽ giúp chúng ta tạo ra một
        // DOMString chứa URL đại diện cho Object được đưa vào. Bạn có thể xem chi tiết tại: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
        // audioElm.src = URL.createObjectURL(this.files[0]);

        // Tiếp theo, tải file và thực hiện play file đã được chọn
        // audioElm.load();
        // audioElm.play();

        // Tiếp, khởi tạo AudioContext
        var audioContext = new AudioContext();
        // Khởi tạo AudioContext source
        var audioContextSrc = audioContext.createMediaElementSource(audio);
        // Khởi tạo Analyser
        var audioAnalyser = audioContext.createAnalyser();
        // Khởi tạo 2D canvas
        canvasContext = canvasElm.getContext("2d");

        // Kết nối AudioContext source với Analyser
        audioContextSrc.connect(audioAnalyser);
        // Kết nối Analyser với AudioDestinationNode
        audioAnalyser.connect(audioContext.destination);

        // Gán FFT size là 256 cho Analyser
        // Các bạn có thể xem thêm tại: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
        audioAnalyser.fftSize = 256;

        // Lấy dữ liệu tần số từ Analyser
        // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount
        var analyserFrequencyLength = audioAnalyser.frequencyBinCount;

        // Khởi tạo một 8-bit unsigned interge array có số lượng phần tử bằng analyserFrequencyLength
        var frequencyDataArray = new Uint8Array(analyserFrequencyLength);

        // Lấy width và height của canvas
        var canvasWith = canvasElm.width;
        var canvasHeight = canvasElm.height;

        // Tính toán barWidth và barHeight
        var barWidth = (canvasWith / analyserFrequencyLength) * 1.35;
        var barHeight;
        var barIndex = 0;

        function renderFrame() {
          // Thông báo với trình duyệt rằng chúng ta đang chuẩn bị thực hiện một animation với method là như này. Hãy chuẩn bị đi =)
          // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
          window.requestAnimationFrame(renderFrame);

          // Reset lại barIndex trở về 0
          barIndex = 0;

          // Điền dữ liệu tần số vào mảng
          audioAnalyser.getByteFrequencyData(frequencyDataArray);

          // Vẽ một hình chữ nhật với nền màu đen
          canvasContext.fillStyle = "rgba(0, 0, 0, 0.2";

          canvasContext.fillRect(0, 0, canvasWith, canvasHeight);

          // Chạy lần lượt từ 0 đến hết dữ liệu tần số của Analyser
          for (var i = 0; i < analyserFrequencyLength; i++) {
            barHeight = frequencyDataArray[i];
            // Tạo màu cho thanh bar
            var rgbRed = barHeight + (25 * (i / analyserFrequencyLength));
            var rgbGreen = 250 * (i / analyserFrequencyLength);
            var rgbBlue = 50;

            // Điền màu và vẽ bar
            canvasContext.fillStyle = "rgb(" + rgbRed + ", " + rgbGreen + ", " + rgbBlue + ")";
            canvasContext.fillRect(barIndex, (canvasHeight - barHeight), barWidth, barHeight);

            barIndex += (barWidth + 1);
          }
        }
        // Gọi method để render vào canvas
        renderFrame();
      }
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
          alert('Đang phát triển')
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
    document.title = this.currentSong.name;
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


