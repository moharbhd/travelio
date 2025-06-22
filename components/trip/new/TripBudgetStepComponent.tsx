import { useTrip } from "@context/TripContext";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

function TripBudgetStepComponent() {
  const { tripInput, updateTripInput } = useTrip();

  return (
    <div className="flex flex-col items-center justify-center">
      <Label className="block text-md px-1 font-medium text-gray-700 mb-2">
        What is your budget
      </Label>
      <div className="flex flex-row items-center justify-center">
        <div>
          <span className="text-4xl font-semibold">$</span>
        </div>
        <div className="px-1"></div>
        <Input
          type="number"
          value={tripInput.budget || ""}
          onChange={(e) => updateTripInput({ budget: Number(e.target.value) })}
          className="w-[150px] border-none text-4xl md:text-4xl lg:text-5xl text-center font-semibold"
          placeholder="400"
        />
      </div>
    </div>
  );
}

export default TripBudgetStepComponent;
