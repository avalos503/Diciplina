import { notFound } from "next/navigation";
import { RoutineDetailView } from "@/components/RoutineDetailView";
import { getRoutine, ROUTINES } from "@/lib/routines";

export function generateStaticParams() {
  return ROUTINES.map((routine) => ({ id: routine.id }));
}

export const dynamicParams = false;

export default async function RoutinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!getRoutine(id)) notFound();
  return <RoutineDetailView routineId={id} />;
}
