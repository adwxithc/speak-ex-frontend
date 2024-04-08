interface INavigationItem{
    name:string,
    href:string,
    current:boolean,
    isPrivate:boolean
}

export const navigation:INavigationItem[]= [
    { name: 'Home', href: '#', current: false,isPrivate:true },
    { name: 'Search', href: '#', current: false, isPrivate:true },
    { name: 'Store', href: '#', current: false, isPrivate:true },
    { name: 'About', href: '#', current: false, isPrivate:true },
  ]