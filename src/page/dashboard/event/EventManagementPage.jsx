import { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import "cropperjs/dist/cropper.css";

import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import Dashboard from "../../../layouts/dashboard";
import dataUrlToFile from "../../../utils/dataUrlToFile";

import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import DeleteEventModal from "./DeleteEventModal";
import {
  useGetAllEvents,
  useAddEventByAdmin,
  useEditEventByAdmin,
  useDeleteEventByAdmin,
} from "../../../features/event";

const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* ...existing code... */}
      <div className="relative">
        <img
          src={
            event.image ||
            event.event_photo ||
            "https://via.placeholder.com/400x300"
          }
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-cyan-100 text-cyan-600 px-4 py-1 rounded-full text-sm font-medium capitalize">
            {event.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="text-gray-500 text-sm mb-2 capitalize">
          {event.category}
        </div>

        <div className="h-16 ">
          <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
            {event.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {event.sdgs && event.sdgs.length > 0 ? (
            event.sdgs.map((sdg, idx) => (
              <div
                key={idx}
                className="flex items-center text-cyan-500 text-xs bg-cyan-50 px-2 py-1 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{sdg.code}</span>
              </div>
            ))
          ) : (
            <span className="text-xs text-gray-400">No SDGs</span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center text-cyan-500 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span className="ml-1">
              {event.start_date
                ? new Date(event.start_date).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                : "-"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center text-green-600 text-sm font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span className="ml-1">
              {event.price && Number(event.price) > 0
                ? new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(Number(event.price))
                : "Gratis"}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mb-3 text-sm">
          <div className="text-gray-600">
            <span className="font-semibold">{event.participant || 0}</span>{" "}
            Participants
          </div>
          <div className="text-gray-600">
            <span className="font-semibold">{event.committee || 0}</span>{" "}
            Committee
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(event)}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-xl font-semibold transition-colors duration-200"
          >
            Edit
          </button>
          <DeleteEventModal
            id={event.id}
            deleteEvent={onDelete}
            deletePending={false}
          />
        </div>

        <div className="mt-3 text-xs text-gray-400">
          Updated:{" "}
          {event.updated_at
            ? new Date(event.updated_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            : "-"}
        </div>
      </div>
    </div>
  );
};

const EventManagementPage = () => {
  const [activeTab, setActiveTab] = useState("program");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const {
    data: eventsFromApi,
    isLoading: loadingEvents,
    refetch,
  } = useGetAllEvents();
  const { mutate: addEvent, isPending: addingEvent } = useAddEventByAdmin();
  const { mutate: editEvent, isPending: editingEvent } = useEditEventByAdmin();
  const { mutate: deleteEvent, isPending: deletingEvent } =
    useDeleteEventByAdmin();

  const filteredEvents =
    eventsFromApi?.filter(
      (event) => event.category.toLowerCase() === activeTab.toLowerCase()
    ) || [];

  const handleEdit = (event) => {
    console.log("Edit event:", event);
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleDelete = (eventId) => {
    console.log("Delete event ID:", eventId);

    deleteEvent(eventId, {
      onSuccess: (response) => {
        console.log("Event berhasil dihapus:", response);
        refetch();
      },
      onError: (error) => {
        console.error("Error deleting event:", error);
      },
    });
  };

  const handleAddNewEvent = () => {
    setShowAddModal(true);
  };

  const handleSubmitEvent = (formData) => {
    console.log("Parent received formData:", formData);

    addEvent(formData, {
      onSuccess: (response) => {
        console.log("Event berhasil ditambahkan:", response);
        setShowAddModal(false);
        refetch();
      },
      onError: (error) => {
        console.error("Error adding event:", error);
      },
    });
  };

  const handleUpdateEvent = (eventId, formData) => {
    console.log("Parent updating event:", eventId);

    editEvent(
      { eventId, body: formData },
      {
        onSuccess: (response) => {
          console.log("Event berhasil diupdate:", response);
          setShowEditModal(false);
          setSelectedEvent(null);
          refetch();
        },
        onError: (error) => {
          console.error("Error updating event:", error);
        },
      }
    );
  };

  return (
    <Dashboard title="Event Management">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mt-4 sm:flex-row justify-end items-start sm:items-center mb-6 gap-4">
          <Button
            onClick={handleAddNewEvent}
            ariaLabel="navigate-add-event"
            intent="secondary"
            disabled={addingEvent || editingEvent || deletingEvent}
          >
            {addingEvent ? "Adding..." : "Add New Event"}
          </Button>
        </div>

        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("program")}
            className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${activeTab === "program"
              ? "border-cyan-500 text-cyan-500"
              : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            Program
          </button>
          <button
            onClick={() => setActiveTab("project")}
            className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${activeTab === "project"
              ? "border-cyan-500 text-cyan-500"
              : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            Project
          </button>
        </div>

        {loadingEvents && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <div className="text-gray-500">Loading events...</div>
          </div>
        )}

        {!loadingEvents && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.id || index}
                event={event}
                onEdit={handleEdit}
                onDelete={handleDelete}
                deletePending={deletingEvent}
              />
            ))}
          </div>
        )}

        {!loadingEvents && filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Belum ada {activeTab}
            </h3>
            <p className="text-gray-500 mb-4">
              Mulai tambahkan {activeTab} baru dengan klik tombol "Add New
              Event"
            </p>
          </div>
        )}
      </div>

      <AddEventModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        activeTab={activeTab}
        onSubmit={handleSubmitEvent}
        isSubmitting={addingEvent}
      />

      <EditEventModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        eventData={selectedEvent}
        onSubmit={handleUpdateEvent}
        isSubmitting={editingEvent}
      />
    </Dashboard>
  );
};

export default EventManagementPage;
