export function arrItems(secondlink="",thirdlink="",fourthlink="",secondpath,thirdpath,fourthpath){
  return [
  {
    id: 1,
    label: "Home",
    path:"/employer"
  },
  {
    id: 2,
    label: secondlink,
    path:""
  },
  {
    id: 3,
    label: thirdlink,
    path:thirdpath
  },
  {
    id: 4,
    label: fourthlink,
    path:fourthpath
  },
];
}