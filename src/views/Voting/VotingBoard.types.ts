import { z } from "zod";
import { votingFormSchema } from "./VotingBoard.schemas";

type VotingFormData = z.infer<typeof votingFormSchema>;

export type { VotingFormData };
