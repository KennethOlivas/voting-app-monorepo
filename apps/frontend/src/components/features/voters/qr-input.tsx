"use client"

import { useState } from "react";
import jsQR from "jsqr";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScanQrCode } from "lucide-react";
import { parseID } from "@/lib/parseQR";
import { toast } from "sonner";

const QRInput = () => {
  const [qrResult, setQrResult] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        if (qrCode) {
          setQrResult(qrCode.data);
        } else {
          toast.error("No QR code found in the image");
          setQrResult(null);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Label htmlFor="picture" className="relative px-4 py-3 cursor-pointer inline-flex 
      items-center justify-center hover:bg-accent hover:text-accent-foreground gap-2
      whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 
      overflow-hidden before:absolute before:inset-0 before:rounded-[inherit]
      before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)]
      before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat
      before:transition-[background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] before:duration-1000">
        <Input id="picture" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <ScanQrCode className="file:text-foreground relative" />
      </Label>
      {qrResult && <p className="mt-2 text-sm">{
        JSON.stringify(parseID(qrResult))}</p>}
    </div>
  );
};

export default QRInput;
