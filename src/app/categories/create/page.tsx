
const CategoryCreate = () => {
  return (
    <div className="flex items-center justify-center p-12 bg-white rounded-xl">
      <div className="mx-auto w-full max-w-[550px]">
        <h2
          className="text-2xl text-center mb-4 text-gray-950 font-bold"
        >
          Create Category
        </h2>
        <form  >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <input id="file" type="file" name='file' />
          <button
            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"

          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryCreate;