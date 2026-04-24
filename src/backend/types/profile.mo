import Common "common";

module {
  public type UserProfile = {
    name : Text;
    learningGoals : Text;
    skillLevel : Common.SkillLevel;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
