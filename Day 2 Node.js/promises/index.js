async function getData() {
  try {
    const res = (await fetch("https://jsonplaceholder.typicode.com/users/1"));
    
    const user = await res.json();

    const postsRes = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    );
    const posts = await postsRes.json();

    console.log(user.name, posts.length);
  } catch (err) {
    console.error(err);
  }
}

const temp = getData();

console.log("Result"+temp);



// fetch("https://jsonplaceholder.typicode.com/users/1")
//   .then(res => {
//     if (!res.ok) {
//       throw new Error("Error " + res.status);
//     }
//     return res.json();
//   })
//   .then(data => console.log(data))
//   .catch(err => console.error(err.message));
