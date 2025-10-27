type AuthPromptModalProps = {
  onContinueAsGuest: () => void;
  onSignIn: () => void;
  onClose: () => void;
};

const AuthPromptModal: React.FC<AuthPromptModalProps> = ({
  onContinueAsGuest,
  onSignIn,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center">
      <div className="absolute bg-black opacity-40 w-screen h-screen "></div>
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 text-center relative z-20">
        <h3 className="text-xl font-semibold mb-4!">Create an Account?</h3>
        <p className="text-sm text-gray-700 mb-6!">
          Save your order history and checkout faster next time.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onSignIn}
            className="btn w-full py-2 border bg-black border-black text-white! rounded hover:bg-white hover:text-black! transition text-sm!"
          >
            Sign In / Create Account
          </button>
          <button
            onClick={onContinueAsGuest}
            className="btn w-full py-2 border border-gray-400 text-gray-700! rounded hover:bg-gray-100 transition text-sm!"
          >
            Checkout as Guest
          </button>
        </div>
        <button
          onClick={onClose}
          className="btn mt-4 text-xs! text-gray-500! hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthPromptModal;
