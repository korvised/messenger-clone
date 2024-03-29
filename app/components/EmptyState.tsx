interface EmptyStateProps {}

const EmptyState: React.FC<EmptyStateProps> = () => {
  return (
    <div
      className="
        flex
        h-full
        items-center
        justify-center
        bg-gray-100
        px-4
        py-10
        sm:px-6
        sm:py-8
      "
    >
      <div className="flex flex-col items-center text-center">
        <h3
          className="
            mt-2
            text-2xl
            font-semibold
            text-gray-900
          "
        >
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  )
}

export default EmptyState
