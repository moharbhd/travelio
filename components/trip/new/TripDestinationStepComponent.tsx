import { useTrip } from "@context/TripContext";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

function TripDestinationStepComponent() {
  const { tripInput, updateTripInput } = useTrip();
  return (
    <div className="flex flex-col items-center justify-center">
      <Label
        htmlFor="destination"
        className="block text-sm px-1 font-medium text-gray-700 mb-1"
      >
        Destination (City or Region)
      </Label>
      <Input
        type="text"
        id="destination"
        value={tripInput.destination}
        onChange={(e) => updateTripInput({ destination: e.target.value })}
        className="max-w-prose"
        placeholder="e.g., Tokyo, Japan"
      />
    </div>
  );
}

export default TripDestinationStepComponent;
