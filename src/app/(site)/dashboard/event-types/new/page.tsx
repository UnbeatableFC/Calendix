import DashboardNav from "@/components/common/DashboardNav";
import EventForm from "@/components/common/EventForm";
import React from "react";

const NewEventPage = () => {
  return (
    <div>
      <DashboardNav />
      <div className="mt-4">
        <EventForm />
      </div>
    </div>
  );
};

export default NewEventPage;
