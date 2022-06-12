import { useQuery } from "react-query";
import { getFormList } from "@/api/form";

export default function useForms() {
	return useQuery("forms", getFormList);
}
