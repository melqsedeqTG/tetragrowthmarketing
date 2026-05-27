import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import RegistrationForm from "./RegistrationForm";

interface LeadFormPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadFormPopup = ({ open, onOpenChange }: LeadFormPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] overflow-y-auto border-border/70 bg-background/95 p-0 text-foreground shadow-2xl backdrop-blur-xl sm:rounded-[1.65rem]">
        <DialogTitle className="sr-only">Solicitar diagnóstico</DialogTitle>
        <DialogDescription className="sr-only">
          Preencha seus dados para solicitar o Diagnóstico de Marketing da Tetra.
        </DialogDescription>

        <div className="relative overflow-hidden rounded-[inherit]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative p-6 md:p-8">
            <RegistrationForm id="diagnostico-popup-form" variant="popup" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormPopup;
