import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { HistoryType } from "@/lib/types";

type DialogComponentProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  userhistory: HistoryType[];
};

const DialogComponent = (props: DialogComponentProps) => {
  const { isDialogOpen, setIsDialogOpen, userhistory } = props;
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-h-96 overflow-auto">
        <DialogHeader>
          <DialogTitle>Test&apos;s History</DialogTitle>
        </DialogHeader>
        <div>
          {userhistory.length > 0 ? (
            userhistory.map((data, i) => (
              <p key={i} className="border-b first-of-type:border-t py-1">
                <h3>Date: {data.date}</h3>
                <h3>Points Awarded: {data.pointsAwarded}</h3>
              </p>
            ))
          ) : (
            <p className="h-10 text-center">No history found</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
