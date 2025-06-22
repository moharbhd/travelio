import React from "react";

function CustomLoadingPage() {
  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <p className="text-muted-foreground text-2xl">Loading...</p>
      </div>
    </div>
  );
}

export default CustomLoadingPage;
