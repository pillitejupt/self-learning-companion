import Map "mo:core/Map";
import Types "../types/profile";
import Common "../types/common";

module {
  public func getProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : ?Types.UserProfile {
    profiles.get(userId)
  };

  public func saveProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    profile : Types.UserProfile,
  ) : () {
    profiles.add(userId, profile)
  };

  public func hasProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : Bool {
    profiles.containsKey(userId)
  };
};
