import useApi from "./useApi";
import { useQuery } from "@tanstack/react-query";

export function useSqueduledOperations() {
    const {
        fetchAutomatedScrapOperations,
        createAutomatedScrapOperation,
        deleteAutomatedScrapOperation,
        activateAutomatedScrapOperation,
        deactivateAutomatedScrapOperation,
    } = useApi()

    const { data, isError, error, isLoading, isFetching, refetch } = useQuery({
        queryKey: ['automatedScrapOperations'],
        queryFn: fetchAutomatedScrapOperations,
        staleTime: 1000 * 60, // Considering data fresh for 1 minute
    })

    // Helper function to handle operations
    const executeOperation = async (operationFn, operation) => {
        await operationFn(operation)
        refetch()
    }

    // Simplified operation handlers using the helper function
    const handleDelete = (operation) => executeOperation(deleteAutomatedScrapOperation, operation)
    const createOperation = (operation) => executeOperation(createAutomatedScrapOperation, operation)
    const activateOperation = (operation) => executeOperation(activateAutomatedScrapOperation, operation)
    const deactivateOperation = (operation) => executeOperation(deactivateAutomatedScrapOperation, operation)



    return {
        operations: data,
        isFetching,
        isError,
        error,
        isLoading,
        handleDelete,
        createOperation,
        activateOperation,
        deactivateOperation
    }
}