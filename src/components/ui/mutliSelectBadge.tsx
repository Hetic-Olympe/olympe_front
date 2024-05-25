import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type Options = {
  value: string;
  label: string;
};

interface MultiSelectBadgeProps {
  placeholder?: string;
  options: Options[];
  onChange: (selected: Options[]) => void;
  defaultValues?: Options[];
}

export default function MultiSelectBadge({
  placeholder = "Select an option",
  options,
  onChange,
  defaultValues = []
}: MultiSelectBadgeProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Options[]>(defaultValues);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (option: Options) => {
    const newSelected = selected.filter(s => s.value !== option.value);
    setSelected(newSelected);
    onChange(newSelected);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input && (e.key === "Delete" || e.key === "Backspace") && !input.value) {
      const newSelected = selected.slice(0, -1);
      setSelected(newSelected);
      onChange(newSelected);
    }
    if (input && e.key === "Escape") {
      input.blur();
    }
  };

  const selectables = options.filter(option => !selected.some(s => s.value === option.value));

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((option) => (
            <Badge key={option.value} variant="secondary" className="text-primary bg-primary-light">
              {option.label}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => e.key === "Enter" && handleUnselect(option)}
                onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onClick={() => handleUnselect(option)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground stroke-primary" strokeWidth={2} />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 &&
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto max-h-60">
              {selectables.map((option) => (
                <CommandItem
                  key={option.value}
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onSelect={() => {
                    setInputValue("");
                    const newSelected = [...selected, option];
                    setSelected(newSelected);
                    onChange(newSelected);
                  }}
                  className="cursor-pointer"
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        }
      </div>
    </Command>
  );
}
