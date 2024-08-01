const slider = new Vue({
  el: "#slider",

  data: () => ({
    val: 70,
    gender: "male",
  }),

  // Just for fun, set the value randomly each time the component loads. (Means the value of 70 above really doesn't do anything.)
  mounted() {
    this.val = Math.floor(Math.random() * 101); // Allow the value to be up to 100
  },

  computed: {
    // This is not ideal just because it needs knowledge of how wide the track is.
    // Ideally I'd like to do this more dynamically so it works with any track length,
    // but for the sake of smooth animations I kept it like this.
    getPlacement() {
      return this.val * 14.5 + `%`;
    },

    // This is kinda hacky, but if the background is rounded at too low a value, you can see it peeking out from behind the emoji.
    greaterThanFifty() {
      return this.val > 50 ? `var(--roundness)` : `0`;
    },

    // Makes the color smoothly move from red to orange to yellow
    getHappinessColor() {
      return `rgba(255, ${106 + (103 / 100) * this.val}, ${
        Math.floor((this.val * -1) / 7.692) + 13
      })`;
    },

    // Adjusts the amount of yellow in the filled slider
    getSliderBackground() {
      return `linear-gradient(to right, var(--orange), ${
        this.val * -1 + 125
      }%, var(--yellow))`;
    },

    // Changes which emoji is displayed based on age range and gender
    getHappiness() {
      const maleEmojis = ["👶", "👦", "🧒", "👨‍🦱", "👨", "👨‍🦳", "👴", "👴"];
      const femaleEmojis = ["👶", "👧", "🧒", "👩‍🦱", "👩", "👩‍🦳", "👵", "👵"];
      const emojis = this.gender === "male" ? maleEmojis : femaleEmojis;

      if (this.val >= 60) {
        return emojis[7];
      } else if (this.val >= 50) {
        return emojis[6];
      } else if (this.val >= 40) {
        return emojis[5];
      } else if (this.val >= 20) {
        return emojis[4];
      } else if (this.val >= 15) {
        return emojis[3];
      } else if (this.val >= 10) {
        return emojis[2];
      } else if (this.val >= 5) {
        return emojis[1];
      } else {
        return emojis[0];
      }
    },

    // Message for values over 80
    getOldAgeMessage() {
      return this.val > 80 ? "Are you really that old?" : "";
    },
  },
});
