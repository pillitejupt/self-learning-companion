module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type TopicId = Nat;
  public type QuizId = Nat;
  public type SessionId = Nat;

  public type SkillLevel = {
    #beginner;
    #intermediate;
    #advanced;
  };

  public type Badge = {
    #firstSteps;
    #quizMaster;
    #perfectScore;
    #streak;
  };
};
