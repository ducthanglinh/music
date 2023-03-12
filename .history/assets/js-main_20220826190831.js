const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
  currentIndex: 0,
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
      name: "Đâu còn đây Orinn Remix",
      singer: "Tipo remix",
      path: "./assets/music/Đâu Còn Đây Orinn Remix.mp3",
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
    const htmls = this.songs.map((song) => {
      return `<div class="song">
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

    $(".playlist").innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    const cd = $(".cd");
    const cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
  },

  start: function () {
    this.defineProperties, this.handleEvent();
    this.render();
  },
};
app.start();
