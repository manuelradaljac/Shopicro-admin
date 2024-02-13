import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
  
interface DatePeriodSelectProps {
}

const DatePeriodSelect: React.FC<DatePeriodSelectProps> = () => {
  return (
    <Select>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Odaberite period" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="3" defaultChecked>3 dana</SelectItem>
        <SelectItem value="7">tjedan</SelectItem>
        <SelectItem value="14">2 tjedna</SelectItem>
        <SelectItem value="30">mjesec</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DatePeriodSelect;
