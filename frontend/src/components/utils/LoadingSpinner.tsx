const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center">
            <div
                className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
                role="status"
            />
        </div>
    );
};

export default LoadingSpinner;