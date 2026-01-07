class Event {
  constructor({
    name,
    description,
    hasMultipleDifficulties,
    themeColor,
    icon,
    startDate,
    endDate,
    displayImageUrl,
    beginnerDescription = null,
    intermediateDescription = null,
    advancedDescription = null,
    prize = null,
    id = null,
  }) {
    this.name = name;
    this.description = description;
    this.hasMultipleDifficulties = hasMultipleDifficulties;
    this.themeColor = themeColor;
    this.icon = icon;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.displayImageUrl = displayImageUrl;
    this.beginnerDescription = beginnerDescription;
    this.intermediateDescription = intermediateDescription;
    this.advancedDescription = advancedDescription;
    this.prize = prize;
    this.id = id;
  }
}

export default Event;