const CategoriesMenu = () => {
    const categoriesMenu = document.getElementById('categories-menu')
    const items = categoriesMenu.querySelectorAll('a')
    const button = categoriesMenu.querySelector('button')

    items.forEach(item => {
        item.addEventListener( 'click', NavigationEvents )
    })

    button.addEventListener( 'click', ButtonEvents )

    function NavigationEvents( e ) {
        e.preventDefault()
        const item = this

        const ItemCheck = () => {
            items.forEach(item => {
                item.classList.remove('check')
            })
    
            item.classList.add('check')
        }

        const SubMenuEvents = () => {
            const VerifyFixeds = ( items ) => {
                const RemoveFixed = ( links ) => {
                    links.forEach(item => {
                        item.classList.remove('fixed')
                    });
                }

                items.forEach(item => {
                    const links = item.querySelectorAll('a')
                    RemoveFixed( links )
                })
            }

            const GetSubMenus = () => {
                const childrens = item.parentElement.querySelectorAll(':scope > ul > ._allcat-subs')

                return childrens
            }

            const subMenus = GetSubMenus()
            VerifyFixeds( subMenus )

            if ( subMenus.length > 0 ) {
                item.classList.add( 'fixed' )

                items.forEach(item => {
                    if ( !item.classList.contains('fixed') ){
                        item.classList.remove('show')
                    }
                })

                subMenus.forEach(item => {
                    const children = item.querySelector(':scope > a')
                    children.classList.add('show')
                })
            } else {
                const parent = item.parentElement.parentElement
                const itemsToHide = parent.querySelectorAll('a:not(.check)')
                itemsToHide.forEach(item => {
                    item.classList.remove('show')
                })
            }
        }

        ItemCheck()
        SubMenuEvents()
    }

    function ButtonEvents( e ) {
        e.preventDefault()

        const GetLinkFromItems = () => {
            let link
            const links = Array.from( items )
            links.every(item => {
                if ( item.classList.contains('check') ) {
                    link = item.getAttribute('href')
                    return false
                }
    
                link = null            
                return true
            })

            return link
        }

        const OpenLink = () => {
            const link = GetLinkFromItems()

            if ( link !== null ) {
                window.open(link, '_self')
            }
        }

        OpenLink()
    }
}

export { CategoriesMenu }