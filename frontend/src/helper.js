export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export const eventTypeOptions = {
  task_completed: "Task completed",
  mood_observation: "Mood Observation",
  fluid_intake_observation: "Fluid intake observation",
  incontinence_pad_observation: "Incontinence pad observation",
  check_out: "Check out",
  visit_completed: "Visit completed",
  regular_medication_taken: "Regular medication taken",
  food_intake_observation: "Food intake observation",
  general_observation: "General observation",
  physical_health_observation: "Physical health observation",
  mental_health_observation: "Mental health observation",
};
