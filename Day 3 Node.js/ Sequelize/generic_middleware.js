export const generic_middleware = (req, res, next) => {

    const time = new Date().toLocaleTimeString();

    console.log(`\n--- [${time}] Request Aayi Hai ---`);
    console.log(`Method: ${req.method}`); // GET, POST.
    console.log(`Path: ${req.url}`);      // Konsa route hai

    next(); 
};