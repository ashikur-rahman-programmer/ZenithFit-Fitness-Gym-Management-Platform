export const getPendingTrainers = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/trainer-application`,
    { cache: "no-store" },
  );
  return res.json();
};

export const updateTrainerStatus = async (id, data) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/trainer-application/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  return await res.json();
};
