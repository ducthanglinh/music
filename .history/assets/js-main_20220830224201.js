const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const player = $(".player");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const progress = $(".progress");
const btnNext = $(".btn-next");
const btnPrev = $(".btn-prev");
const randombtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playList = $(".playlist");
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "Hương Remix",
      singer: "Văn Mai Hương",
      path: "./assets/music/huong.mp3",
      image: "./assets/img/huong.jpg",
    },
    {
      name: "Người lạ thoáng qua Remix",
      singer: "Đinh Huy Tùng",
      path: "./assets/music/NLTQ.mp3",
      image: "./assets/img/NLTQ.jpg",
    },
    {
      name: "Như một người dưng Remix",
      singer: "Tipo remix",
      path: "./assets/music/HTG.mp3",
      image: "./assets/img/HTG.jpeg",
    },
    {
      name: "Cưa là đổ Remix",
      singer: "Tipo remix",
      path: "./assets/music/Cưa Là Đổ Remix.mp3",
      image: "./assets/img/HTG.jpeg",
    },
    {
      name: "Yêu là cưới Remix",
      singer: "Tipo remix",
      path: "./assets/music/ylc.mp3",
      image: "./assets/img/HTG.jpeg",
    },
    {
      name: "Hôm Qua Tôi Đã Khóc Remix",
      singer: "Tipo remix",
      path: "./assets/music/Hôm Qua Tôi Đã Khóc Remix.mp3",
      image: "./assets/img/HTG.jpeg",
    },
    {
      name: "Thay lòng",
      singer: "DIMZ, TVk, NH4T",
      path: "./assets/music/Thay long.mp3",
      image: "./assets/img/thay long.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `<div class="song ${
        index === app.currentIndex ? "active" : ""
      } "data-index ="${index}">
  <div class="thumb" style="background-image: url('${song.image}')">
  </div>
  <div class="body">
    <h3 class="title">${song.name}</h3>
    <p class="author">${song.singer}</p>
  </div>
  <div class="option">
    <i class="fas fa-ellipsis-h"></i>
  </div>
</div>
    `;
    });

    playList.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    const cdWidth = cd.offsetWidth;

    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity,
    });

    cdThumbAnimate.pause();
    document.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    playBtn.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
        cdThumbAnimate.pause();
      } else {
        cdThumbAnimate.play();
        audio.play();
      }
    };
    audio.onplay = function () {
      app.isPlaying = true;
      player.classList.add("playing");
    };
    audio.onpause = function () {
      app.isPlaying = false;
      player.classList.remove("playing");
    };

    audio.ontimeupdate = function () {
      if (audio.duration && isTimeUpdate) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    let isTimeUpdate = true;
    progress.onmousedown = function () {
      isTimeUpdate = false;
    };
    progress.ontouchstart = function () {
      isTimeUpdate = false;
    };
    //seek music
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
      isTimeUpdate = true;
    };
    btnNext.onclick = function () {
      if (app.isRandom) {
        app.playRandomSong();
      } else {
        app.nextSong();
      }
      audio.play();
      cdThumbAnimate.play();
      app.render();
      app.scrollToActiveSong();
    };
    btnPrev.onclick = function () {
      if (app.isRandom) {
        app.playRandomSong();
      } else {
        app.prevSong();
      }
      audio.play();
      cdThumbAnimate.play();
      app.render();
      app.scrollToActiveSong();
    };
    randombtn.onclick = function () {
      if (app.isRandom) {
        randombtn.classList.remove("active");
        app.isRandom = false;
      } else {
        randombtn.classList.add("active");
        app.isRandom = true;
      }
    };
    repeatBtn.onclick = function () {
      if (app.isRepeat) {
        repeatBtn.classList.remove("active");
        app.isRepeat = false;
      } else {
        repeatBtn.classList.add("active");
        app.isRepeat = true;
      }
    };
    audio.onended = function () {
      if (app.isRepeat) {
        audio.play();
      } else {
        btnNext.click();
        app.render();
        app.scrollToActiveSong();
      }
    };

    playList.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || !e.target.closest(".option")) {
        if (songNode) {
          console.log(songNode.dataset.index);
        }
        if (e.target.closest(".option")) {
          console.log(123);
        }
      }
    };
  },
  scrollToActiveSong: function () {
    if (app.currentIndex === 0) {
      setTimeout(() => {
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 200);
    } else {
      setTimeout(() => {
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 200);
    }
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  nextSong: function () {
    app.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    app.loadCurrentSong();
  },
  prevSong: function () {
    app.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    app.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === app.currentIndex);
    app.currentIndex = newIndex;
    app.loadCurrentSong();
  },

  start: function () {
    this.defineProperties();
    this.handleEvent();
    this.loadCurrentSong();
    this.render();
  },
};
app.start();
