import { useState } from "react";

export const useModal = (defaultState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(defaultState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const onChange = (open: boolean) => setIsOpen(open);
  
  return { isOpen, open, close, onChange };
}
