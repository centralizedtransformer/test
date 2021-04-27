(function () {
    let imgArr = document.querySelectorAll('article img');
    imgArr.forEach(function(item) {
        let link = document.createElement('a'),
            parent = item.parentNode;

        if (parent.tagName !== 'A') {
            link.href = item.getAttribute('src');
            link.innerHTML = item.outerHTML;
            link.setAttribute('data-featherlight', 'image');
            item.remove();
            parent.appendChild(link);
        }
    })

    //smooth scroll to anchors
    document.querySelectorAll( 'a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            let id = anchor.getAttribute('href')
            let pos = document.querySelector(id).getClientRects()[0].y - 100 + window.pageYOffset

            window.scrollTo({
                behavior: 'smooth',
                top: pos
            });
        });
    });
    
    function customScript() {
        if (document.querySelector('#docsSearch')){document.querySelector('#docsSearch').remove();}
        var siteRoot = 'https://atomicwallet.io';

        $('head').append(
            '<link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet"> +' +
            '<link rel="stylesheet" href="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/css/main.min.css">'
        )

        var assetCount = 0
        var loadedAssets = 0

        function assetLoaded() {
            loadedAssets++
            if (loadedAssets === assetCount) {
                $('body').addClass('all-ready')
            }
        }

        function loadScript(url, callback) {
            // Add the script tag to the head
            var head = document.head
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = url

            script.onreadystatechange = callback
            script.onload = callback

            // Fire the loading
            head.appendChild(script)
        }


        // Footer subscribe form
        // assetCount++
        // loadScript(`${siteRoot}/js/scroll.js`, assetLoaded)


        assetCount++
        $(document).ready(function () {
            var categories = {
                'Assets': {
                    icon: '01',
                    gradientStart: '#FB23FF',
                    gradientEnd: '#BB03BF',
                    bg: '#3A384E',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/44-assets',
                },
                'Buy crypto': {
                    icon: '02',
                    gradientStart: '#FFE55A',
                    gradientEnd: '#C47600',
                    bg: '#8D6097',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/61-buy-crypto',
                },
                'Exchange': {
                    icon: '03',
                    gradientStart: '#00E525',
                    gradientEnd: '#007134',
                    bg: '#75B687',
                    desc: "",
                    href: 'https://support.atomicwallet.io/category/99-exchange',
                },
                'FAQ': {
                    icon: '05',
                    gradientStart: '#373737',
                    gradientEnd: '#BDBABA',
                    bg: '#3D88B8',
                    desc: "",
                    href: 'https://support.atomicwallet.io/category/48-faq',
                },
                'Getting Started': {
                    icon: '04',
                    gradientStart: '#41D4FC',
                    gradientEnd: '#27778D',
                    bg: '#5CB8D2',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/13-getting-started',
                },
                'Mobile': {
                    icon: '06',
                    gradientStart: '#FFC061',
                    gradientEnd: '#BE7200',
                    bg: '#F3B554',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/33-mobile',
                },
                'Staking': {
                    icon: '065',
                    gradientStart: '#FFC061',
                    gradientEnd: '#BE7200',
                    bg: '#709F3A',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/129-staking',
                },
                'Troubleshooting': {
                    icon: '07',
                    gradientStart: '#FF5A5A',
                    gradientEnd: '#950101',
                    bg: '#3A384E',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/22-troubleshooting',
                },
                'Security': {
                    icon: '08',
                    gradientStart: '#1F8EFA',
                    gradientEnd: '#064786',
                    bg: '#8D6097',
                    desc: '',
                    href: 'https://support.atomicwallet.io/category/17-security',
                },
                'Default': {
                    icon: '01',
                    gradientStart: '#556ff2',
                    gradientEnd: '#00bfff',
                    bg: '#8D6097',
                    desc: '',
                    href: '',
                },
            }
            // remove default nav
            $('#mainNav').remove()

            // main
            mainBlock = ""
            $('body').prepend(mainBlock);


            // add star icons if not search page
            if (!$('#serp').length) {
                $('.icon-article-doc')
                    .after(`<img class="star-icon" src="${siteRoot}/wp-content/themes/atomicwallet/images/icons/support/academy.svg?ver=1.1" />`)
                    .remove()
            } else {
                $('.icon-article-doc').remove()
            }


            // remove separator
            $('.sep').remove()

            // category icons
            $('.category').each(function () {
                var element = $(this)
                var name = element.find('h3').text()
                var obj = categories[name] || categories['Default']

                element.prepend(
                    `<img class="category-icon" src="${siteRoot}/wp-content/themes/atomicwallet/images/icons/support/${obj.icon}.svg?ver=1.1" />`
                )
                element.append(`<div class="category-desc">${obj.desc}</div>`)
            })

            // re-order categories and popular articles
            var categoryList = $('.category-list')
            $('.most-pop-articles').before(categoryList)

            // Remove sort dropdown
            $('.sort').hide()

            // Add icon to category page header
            var categoryHead = $('#categoryHead h1')
            var categoryName = categoryHead.text()
            var obj = categories[categoryName] || categories['Default'];
            var categoryIcon = $(
                `<img class= "category-icon" src="${siteRoot}/wp-content/themes/atomicwallet/images/icons/support/${obj.icon}.svg?ver=1.1" />`
            )
            categoryHead.prepend(categoryIcon)


            // search restuls count above title
            var articlesFound = $('.articlesFound')
            var searchResultsHead = articlesFound.prev()
            searchResultsHead.before(articlesFound)

            $('.articleFoot').remove()

            // Append sign-off
            var articleContent = $('#fullArticle')

            // Links inside an article should all open in a new tab
            articleContent.find('a').each(function (index, element) {
                var link = $(element)
                var href = link.attr('href')
                if (!/^#/.test(href)) {
                    link.attr('target', '_blank')
                }
            })

            articleContent
                .find('img')
                .not('.custom')
                .addClass('noBdr shadow-dark')


            var sidebar = $('#sidebar')
            if (sidebar.length) {
                // Not the homepage

                // Move search from sidebar to header
                var form = sidebar.find('form')
                form.append(`<i class="fa fa-search"></i>`)
                form
                    .find('button span')
                    .removeClass('sr-only')
                    .text('SEARCH')
                form.find('button .icon-search').remove()
                form.find('.search-query').attr('placeholder', '')

                // move last updated to the top
                articleContent.prepend($('.lu'))

                // Remove sidebar header
                sidebar.find('h3').remove()

                if (sidebar.find('.nav').length === 0) {
                    // search results page. Populate the sidebar
                    var nav = $('<ul class="nav nav-list"></ul>')
                    for (var key in categories) {
                        if (key === 'Default') {
                            continue
                        }
                        var current = categories[key]
                        nav.append(`<li><div class="dot"></div><a href="${current.href}">${key}</a></li>`)
                    }
                    sidebar.append(nav)
                }

                // Sidebar dots
                sidebar.find('li').each(function () {
                    var element = $(this)

                    var elementClone = element.clone()
                    elementClone.find('i').remove()
                    var text = elementClone
                        .find('a')
                        .text()
                        .trim()
                    var obj = categories[text] || categories['Default']

                    var dot = $('<div class="dot"></div>')
                    dot.attr(
                        'style',
                        `background-color: ${obj.bg};`
                    )
                    element.prepend(dot)
                })

                // Add conditional classes
                $('body').addClass('not-home')
                $('#contentArea').addClass('not-home-content')
                $('#serp-dd').addClass('not-home')
            } else {
                $('.bg-div').append(
                )
            }

            // navbar toggle
            $('.navbar-toggler').click(function () {
                var button = $(this)
                button.attr('aria-expanded', 'true')
                var navbarCollapse = $('.navbar-collapse')
                navbarCollapse.addClass('show')
            })

            // supported assets search filter
            var analyticsTimeout
            $('.asset-filter input').keyup(function () {
                clearTimeout(analyticsTimeout)

                var input = $(this)
                var str = input.val()

                if (!str.length) {
                    $('.main-tbody tr').removeClass('hidden override__not-shaded override__shaded')
                    $('.no-results').removeClass('enabled')
                    return
                }

                if (str.length > 2) {
                    analyticsTimeout = setTimeout(function () {
                        ga('send', 'event', 'Asset-Search', str.toLowerCase().trim())
                    }, 3000)
                }

                // exchange table
                var rows = $('.assets-table-exchange tr').not('.table-header')
                $('.no-results-exchange').addClass('enabled')
                rows.each(function () {
                    var row = $(this)
                    var rowText = row.find('.coin-name').text() + ' ' + row.find('.coin-tag').text()
                    if (rowText.toLowerCase().search(str.toLowerCase()) > -1) {
                        row.removeClass('hidden')
                        $('.no-results-exchange').removeClass('enabled')
                    } else {
                        row.addClass('hidden')
                    }
                })

                // styling
                $('.assets-table-exchange .main-tbody tr')
                    .not('.hidden')
                    .each(function (index) {
                        var current = $(this)
                        current.removeClass('override__last-row')
                        if (index % 2 === 0) {
                            current.addClass('override__not-shaded').removeClass('override__shaded')
                        } else {
                            current.addClass('override__shaded').removeClass('override__not-shaded')
                        }
                    })
                $('.assets-table-exchange .main-tbody tr')
                    .not('.hidden')
                    .last()
                    .addClass('override__last-row')

                // eth table
                var rows = $('.assets-table-eth tr').not('.table-header')
                $('.no-results-eth').addClass('enabled')
                rows.each(function () {
                    var row = $(this)
                    var rowText = row.find('.coin-name').text() + ' ' + row.find('.coin-tag').text()
                    if (rowText.toLowerCase().search(str.toLowerCase()) > -1) {
                        row.removeClass('hidden')
                        $('.no-results-eth').removeClass('enabled')
                    } else {
                        row.addClass('hidden')
                    }
                })

                // styling
                $('.assets-table-eth .main-tbody tr')
                    .not('.hidden')
                    .each(function (index) {
                        var current = $(this)
                        current.removeClass('override__last-row')
                        if (index % 2 === 0) {
                            current.addClass('override__not-shaded').removeClass('override__shaded')
                        } else {
                            current.addClass('override__shaded').removeClass('override__not-shaded')
                        }
                    })
                $('.assets-table-eth .main-tbody tr')
                    .not('.hidden')
                    .last()
                    .addClass('override__last-row')
            });
            //articles
            var articlesHtml = `
               <section class="articles">
                    <h2 class="articles__title">Popular Articles</h2>
                    <div class="articles__content">
                        <a href="https://support.atomicwallet.io/article/77-does-atomic-wallet-have-fees-to-send-or-receive-the-assets" class="articles__item">Does Atomic Wallet have fees to send or receive?</a>
                        <a href="https://support.atomicwallet.io/article/18-why-is-it-important-to-use-a-vpn" class="articles__item">How to deposit funds to Atomic Wallet?</a>
                        <a href="https://support.atomicwallet.io/article/12-how-to-restore-the-wallet-by-12-word-backup-phrase" class="articles__item">How to restore the wallet by 12-word backup phrase?</a>
                        <a href="https://support.atomicwallet.io/article/47-how-to-buy-cryptocurrencies-with-a-credit-card" class="articles__item">How to buy cryptocurrencies with a credit card?</a>
                        <a href="https://support.atomicwallet.io/article/77-does-atomic-wallet-have-fees-to-send-or-receive-the-assets" class="articles__item">Does Atomic Wallet have fees to send or receive the assets?</a>
                        <a href="https://support.atomicwallet.io/article/6-how-to-install-atomic-wallet-on-your-device" class="articles__item">How to install Atomic Wallet on your device?</a>
                        <a href="https://support.atomicwallet.io/article/104-can-i-cash-out-from-atomic-wallet-to-a-bank-account" class="articles__item">Can I cash out from Atomic Wallet to a bank account?</a>
                        <a href="https://support.atomicwallet.io/article/35-what-is-12-word-recovery-phrase" class="articles__item">What is 12-word recovery phrase?</a>
                        <a href="https://support.atomicwallet.io/article/43-why-20-xrp-is-an-unspendable-balance" class="articles__item">Why 20 XRP is an unspendable balance?</a>
                        <a href="https://support.atomicwallet.io/article/62-what-is-the-fee-to-buy-cryptocurrencies" class="articles__item">What is the fee to buy cryptocurrencies?</a>

                    </div>
                </section>
            `
            // footer
            var footerHtml = `
    <div class="subscribe">
        <h2 class="subscribe__title">Even more cool features are coming</h2>
        <form class="subscribe__form" data-direct-subscribe="103714">
            <input class="subscribe__email" placeholder="Your email" type="text" name="email">
            <input class="subscribe__hidden" type="text" name="api_key" value="8c73afc1b6f47fdb33d8150a369cc05a87772f59">
            <button class="subscribe__button" type="button">Subscribe</button>
        </form>
    </div>
    <div class="subs-pop subs-pop--links">
        <div class="subs-pop__fade"></div>
        <div class="subs-pop__inner">
            <div class="subs-pop__cross"></div>
            <p class="subs-pop__title">Feel free to join our social media to stay in touch with Atomic Wallet!</p>
            <div class="subs-pop__subs">
                <a href="https://twitter.com/atomicwallet" class="subs-pop__link">
                    <img class="subs-pop__img" src="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/img/icons/twitter.png" alt="">
                    <p class="subs-pop__name">Twitter</p>
                </a>
                <a href="https://t.me/AtomicWalletNews" class="subs-pop__link">
                    <img class="subs-pop__img" src="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/img/icons/telegram.png" alt="">
                    <p class="subs-pop__name">Telegram</p>
                </a>
                <a href="https://www.facebook.com/atomicwallet" class="subs-pop__link">
                    <img class="subs-pop__img" src="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/img/icons/facebook.png" alt="">
                    <p class="subs-pop__name">Facebook</p>
                </a>
            </div>
            <p class="subs-pop__desc">These links were created just for you.</p>
        </div>
    </div>

    <div class="subs-pop subs-pop--form">
        <div class="subs-pop__fade"></div>
        <div class="subs-pop__inner">
            <div class="subs-pop__cross"></div>
            <p class="subs-pop__title">Thank you for downloading Atomic!</p>
            <p class="subs-pop__desc">Your support helps us build a stronger and convenient platform. A lot of interesting features are coming soon!</p>
            <p class="subs-pop__title">Subscribe for updates</p>
            <form class="subs-pop__form" data-direct-subscribe="107128">
                <input class="subs-pop__email" placeholder="Type your email here" type="text" name="email">
                <input class="subs-pop__hidden" type="text" name="api_key" value="8c73afc1b6f47fdb33d8150a369cc05a87772f59">
                <button class="subs-pop__button" type="button">Subscribe</button>
            </form>
        </div>
    </div>


    <footer class="footer">
        <div class="footer__wrapper">
            <div class="footer__left">
                <a href="https://atomicwallet.io/" class="footer__logo"><svg class="footer__logo-icon"><use href="#sprite-logo"></use></svg></a>
                <a class="footer__link" href='mailto:support@atomicwallet.io'>support@atomicwallet.io</a>

                <ul class="footer__subs">
                    <li class="footer__subs-item"><a class="footer__subs-link" target="_blank" aria-label="twitter" href="https://twitter.com/atomicwallet"
                                                     rel="nofollow"><svg class="footer__subs-icon"><use href="#sprite-twitter-footer"></use></svg></a></li>
                    <li class="footer__subs-item"><a class="footer__subs-link" target="_blank" aria-label="telegram" href="https://t.me/AtomicWalletNews"
                                                     rel="nofollow"><svg class="footer__subs-icon"><use href="#sprite-telegramm"></use></svg></a></li>
                    <li class="footer__subs-item"><a class="footer__subs-link" target="_blank" aria-label="facebook" href="https://www.facebook.com/atomicwallet"
                                                     rel="nofollow"><svg class="footer__subs-icon"><use href="#sprite-facebook"></use></svg></a></li>
                    <li class="footer__subs-item"><a class="footer__subs-link" target="_blank" aria-label="medium" href="https://medium.com/atomic-wallet"
                                                     rel="nofollow"><svg class="footer__subs-icon"><use href="#sprite-msite"></use></svg></a></li>
                    <li class="footer__subs-item"><a class="footer__subs-link" target="_blank" aria-label="youtube"
                                                     href="https://www.youtube.com/channel/UCLMnUt6BBtA67eic1vRGF3g" rel="nofollow"><svg class="footer__subs-icon"><use href="#sprite-youtube"></use></svg></a></li>
                    <li class="footer__subs-item"><a class="footer__subs-link" target="_blank" aria-label="github" href="https://github.com/Atomicwallet"
                                                     rel="nofollow"><svg class="footer__subs-icon"><use href="#sprite-github-footer"></use></svg></a></li>
                </ul>
                <div class="footer__buttons">
                    <a class="footer__button-link" target="_blank" aria-label="playmarket" href="https://play.google.com/store/apps/details?id=io.atomicwallet" rel="nofollow">
                        <svg class="footer__button"><use href="#sprite-google-play--mobile"></use></svg>
                    </a>
                    <a class="footer__button-link" target="_blank" aria-label="appstore" href="https://apps.apple.com/us/app/atomic-wallet/id1478257827" rel="nofollow">
                        <svg class="footer__button"><use href="#sprite-appstore-mobile"></use></svg>
                    </a>
                </div>
            </div>
            <ul class="footer__right">
                <li class="footer__list">
                    <h4 class="footer__title">Atomic wallet<span class="footer__plus"></span></h4>
                    <ul class="footer__list-inner">
                        <li class="footer__list-item"><a class="footer__list-link" href="https://support.atomicwallet.io/">Support</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://t.me/AtomicWalletNews">News</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/press-kit">Press Kit</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/blog">Blog</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/academy">Academy</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/voting">Coin Listing</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/ambassador-program">Ambassador Program</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/contact-us">Contact Us</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/testimonials">Testimonials & Reviews</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/about-us">About us</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/sitemap">Sitemap</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/careers">Careers</a></li>
                    </ul>
                </li>
                <li class="footer__list">
                    <h4 class="footer__title">Legal<span class="footer__plus"></span></h4>
                    <ul class="footer__list-inner">
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/terms-of-service">Terms of Service</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/privacy">Privacy policy</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/cookies-policy">Cookies policy</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/aml-kyc-policy">AML/KYC Policy</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/risk-disclosure">Risk Disclosure</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/licensing">EULA</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/anti-fraud-policy">Anti-Fraud Policy</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/modern-slavery-statement">Modern Slavery Statement</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/legal-dashboard">Legal Dashboard</a></li>
                    </ul>
                </li>
                <li class="footer__list">
                    <h4 class="footer__title">Prices<span class="footer__plus"></span></h4>
                    <ul class="footer__list-inner">
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/bitcoin-price">Bitcoin (BTC) Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/ethereum-price">Ethereum (ETH) Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/ripple-price">Ripple (XRP) Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/litecoin-price">Litecoin (LTC) Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/eos-price">EOS Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/neo-price">NEO Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/tron-price">TRON (TRX) Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/iota-price">IOTA Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/bitcoin-cash-price">Bitcoin Cash (BCH) Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/dogecoin-price">Dogecoin (DOGE) Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/cardano-price">Cardano (ADA) Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/dash-price">DASH Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/stellar-price">Stellar (XLM) Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/zcash-price">Zcash (ZEC) Price</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/monero-price">Monero (XMR) Price</a></li>
                    </ul>
                </li>
                <li class="footer__list">
                    <h4 class="footer__title">Assets<span class="footer__plus"></span></h4>
                    <ul class="footer__list-inner">
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/bitcoin-wallet">Bitcoin (BTC)</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/ethereum-wallet">Ethereum (ETH)</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/polkadot-wallet">Polkadot (DOT)</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/ripple-wallet">Ripple (XRP)</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/litecoin-wallet">Litecoin (LTC)</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/eos-wallet">EOS</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/neo-wallet">NEO</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/tron-wallet">TRON (TRX)</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/dogecoin-wallet">Dogecoin (DOGE)</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/cardano-wallet">Cardano (ADA)</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/dash-wallet">DASH</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/stellar-wallet">Stellar (XLM)</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/zcash-wallet">Zcash (ZEC)</a></li>
                    </ul>
                </li>
                <li class="footer__list">
                    <h4 class="footer__title">Staking<span class="footer__plus"></span></h4>
                    <ul class="footer__list-inner">
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/staking">Staking</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/awc-staking">AWC Staking</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/cosmos-atom-staking-guide">Cosmos Staking</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/tezos-staking">Tezos Staking</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/band-staking">Band Protocol Staking</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/neo-gas-staking">NEO GAS Staking</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/vechain-staking">Vechain Staking</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/pundi-x-staking">Pundi X Staking</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/zilliqa-staking">Zilliqa Staking</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/cardano-staking">Cardano Staking</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/icon-staking">ICON Staking</a></li>
                        <li class="footer__list-item"><a class="footer__list-link" href="https://atomicwallet.io/polkadot-staking">Polkadot Staking</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </footer>
`
            if (document.url === "https://support.atomicwallet.io/") {
                footerHtml = articlesHtml + footerHtml;
            }

            //header scripts
            $('footer').remove()
            $('body').append(footerHtml)

            // header
            var headerHtml = $(`  <div class="svg-map"> <svg id="arrow" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="10" cy="10" r="9.15" stroke-width="1.7"/> <path d="M6.11089 10L13.8887 10" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/> <path d="M9.99978 6.11114L13.8887 10L9.99978 13.8889" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/> </svg></div><svg style="position: absolute; opacity: 0;" xmlns="http://www.w3.org/2000/svg"> <symbol fill="none" id="sprite-airdrop" viewBox="0 0 20 20"> <title>airdrop</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M0.000777385 8.61361C0.449684 3.98152 4.77615 0 10.0471 0C15.295 0 19.6067 3.94678 20.0873 8.55289C20.094 8.61697 20.0613 8.66961 20.0109 8.70492C19.9813 8.77095 19.9369 8.83155 19.878 8.88146L13.0142 14.6992V20H7.08203V14.7356L0.229833 8.88016C0.201249 8.85573 0.176099 8.82878 0.154429 8.79991C0.0657 8.77713 -0.00844612 8.70878 0.000777385 8.61361ZM0.919206 8.15387L6.92632 13.2872L5.96784 8.69211C5.38074 8.08856 4.37626 7.3218 3.06203 7.3218C2.12515 7.3218 1.41901 7.71146 0.919206 8.15387ZM7.00414 8.76296L8.11067 14.0678H11.9401L13.0556 8.72014C12.5046 8.06449 11.4913 7.17567 10.0471 7.17567C8.57124 7.17567 7.54602 8.10394 7.00414 8.76296ZM16.9058 7.3218C17.9311 7.3218 18.6737 7.71341 19.1859 8.15719L13.1225 13.2966L14.1003 8.60912C14.6249 8.02063 15.5362 7.3218 16.9058 7.3218Z" fill="url(#paint5_linear)"/> <defs> <linearGradient id="paint5_linear" x1="0" y1="20" x2="21.8237" y2="17.8819" gradientUnits="userSpaceOnUse"> <stop stop-color="#1E7AE6"/> <stop offset="1" stop-color="#2FA5F1"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-algo" viewBox="0 0 65 65"> <title>algo</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 65C50.45 65 65 50.45 65 32.5S50.45 0 32.5 0 0 14.55 0 32.5 14.55 65 32.5 65zm11.076-16.404h5.868L43.78 27.465l4.048-7.034h-5.93l-2.511-9.32h-5.759l-21.684 37.5h6.575l17.102-29.59 2.04 7.629-12.678 21.946h6.559l8.206-14.177 3.828 14.177z" fill="url(#pain3dffxcb_linear)"/> <defs> <linearGradient id="pain3dffxcb_linear" x1="32.5" y1="0" x2="32.5" y2="65" gradientUnits="userSpaceOnUse"> <stop stop-color="#E4E4E4"/> <stop offset="1" stop-color="#AAA"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-appstore-mobile" viewBox="0 0 136 43"> <title>appstore-mobile</title> <path d="M131.75 42.5H4.25A4.262 4.262 0 010 38.25v-34A4.262 4.262 0 014.25 0h127.5A4.263 4.263 0 01136 4.25v34a4.263 4.263 0 01-4.25 4.25z" fill="#135"/> <path d="M28.688 21.038c0-3.294 2.762-4.888 2.869-4.994-1.594-2.232-3.932-2.55-4.782-2.657-2.018-.212-4.037 1.17-4.993 1.17-1.063 0-2.657-1.17-4.357-1.17-2.23 0-4.25 1.275-5.418 3.294-2.338 4.038-.638 9.988 1.593 13.281 1.17 1.594 2.444 3.4 4.144 3.294 1.7-.106 2.338-1.062 4.356-1.062 2.02 0 2.55 1.062 4.357 1.062 1.806 0 2.975-1.593 4.037-3.187 1.275-1.806 1.806-3.613 1.806-3.719-.106-.106-3.612-1.381-3.612-5.313zm-3.295-9.776c.85-1.168 1.487-2.656 1.381-4.25-1.275.107-2.975.85-3.825 2.02-.85.955-1.594 2.55-1.381 4.037 1.381.106 2.869-.744 3.825-1.807zm27.52 21.782h-2.338L49.3 29.006h-4.462l-1.17 4.038h-2.23L45.9 19.338h2.763l4.25 13.706zm-4.038-5.738l-1.169-3.612c-.106-.319-.319-1.275-.744-2.55a28.993 28.993 0 01-.637 2.55l-1.169 3.612h3.719zm15.406.744c0 1.7-.425 2.975-1.381 4.037-.85.85-1.806 1.275-3.081 1.275s-2.232-.425-2.763-1.38v5.206h-2.231V26.562c0-1.062 0-2.125-.106-3.293h1.912l.106 1.594c.744-1.17 1.807-1.807 3.294-1.807 1.169 0 2.125.425 2.869 1.381.956.85 1.381 2.02 1.381 3.613zm-2.231 0c0-.956-.212-1.806-.637-2.338-.425-.637-1.063-.956-1.913-.956-.531 0-1.063.213-1.487.532-.425.318-.744.85-.85 1.38-.107.32-.107.532-.107.638v1.7c0 .744.213 1.275.638 1.806.425.532 1.062.744 1.7.744.85 0 1.487-.319 1.912-.956.532-.638.744-1.488.744-2.55zm13.6 0c0 1.7-.425 2.975-1.38 4.037-.85.85-1.807 1.275-3.082 1.275s-2.231-.425-2.763-1.38v5.206h-2.23V26.562c0-1.062 0-2.125-.107-3.293H68l.107 1.594c.743-1.17 1.806-1.807 3.293-1.807 1.17 0 2.125.425 2.87 1.381.955.85 1.38 2.02 1.38 3.613zm-2.23 0c0-.956-.213-1.806-.638-2.338-.425-.637-1.063-.956-1.913-.956-.531 0-1.062.213-1.487.532-.425.318-.744.85-.85 1.38-.107.32-.107.532-.107.638v1.7c0 .744.213 1.275.638 1.806.425.532 1.062.744 1.7.744.85 0 1.487-.319 1.912-.956.532-.638.744-1.488.744-2.55zm14.98 1.168c0 1.17-.425 2.125-1.17 2.87-.85.85-2.124 1.168-3.718 1.168-1.487 0-2.656-.319-3.506-.85l.531-1.806c.956.531 2.019.85 3.188.85.85 0 1.487-.213 1.912-.531.425-.425.638-.85.638-1.488 0-.531-.213-1.063-.532-1.381-.425-.425-1.062-.744-1.912-1.063-2.444-.85-3.613-2.231-3.613-3.931 0-1.169.425-2.019 1.275-2.762.85-.744 1.913-1.063 3.4-1.063 1.275 0 2.232.212 3.082.637l-.532 1.807c-.743-.425-1.593-.638-2.656-.638-.744 0-1.381.213-1.806.532a1.76 1.76 0 00-.531 1.274c0 .532.212.957.637 1.382.319.319 1.063.637 2.019 1.062a7.168 7.168 0 012.656 1.7c.319.532.638 1.275.638 2.232zm7.225-4.355H93.18v4.78c0 1.17.425 1.807 1.275 1.807.425 0 .744 0 .956-.106l.106 1.7c-.425.212-.956.212-1.7.212-.85 0-1.593-.212-2.018-.743-.532-.532-.744-1.382-.744-2.657v-4.994h-1.488v-1.7h1.488v-1.806l2.125-.637v2.444h2.444v1.7zm10.944 3.187c0 1.487-.425 2.762-1.275 3.718-.956.957-2.125 1.488-3.612 1.488-1.488 0-2.657-.531-3.507-1.488-.85-.956-1.275-2.125-1.275-3.612s.425-2.762 1.382-3.719c.85-.956 2.125-1.487 3.612-1.487 1.488 0 2.656.531 3.506 1.487.744.956 1.169 2.125 1.169 3.613zm-2.337.106c0-.956-.213-1.7-.638-2.337a2.278 2.278 0 00-2.019-1.17c-.85 0-1.593.426-2.018 1.17-.425.637-.638 1.487-.638 2.337 0 .956.213 1.7.638 2.338a2.278 2.278 0 002.018 1.168c.85 0 1.488-.425 2.019-1.168.425-.638.638-1.488.638-2.338zm9.458-3.081c-.212 0-.425-.106-.744-.106a2.27 2.27 0 00-1.806.85 3.667 3.667 0 00-.531 1.912v5.206h-2.231v-6.8c0-1.168 0-2.125-.107-3.08h1.913l.106 1.912h.106c.213-.638.638-1.169 1.063-1.594.531-.319 1.062-.531 1.594-.531h.531v2.231h.106zm9.775 2.55c0 .425 0 .744-.106.956h-6.588c0 .956.319 1.7.957 2.231a3.422 3.422 0 002.125.744c.956 0 1.912-.106 2.656-.425l.319 1.487c-.957.425-2.019.638-3.294.638-1.488 0-2.763-.425-3.613-1.381-.85-.85-1.275-2.125-1.275-3.613 0-1.487.425-2.762 1.169-3.718.85-1.063 2.019-1.594 3.506-1.594 1.382 0 2.55.531 3.188 1.594.744.85.956 1.912.956 3.08zm-2.019-.532c0-.637-.106-1.168-.425-1.7-.425-.637-.956-.956-1.7-.956-.743 0-1.275.319-1.7.85-.318.425-.531 1.063-.637 1.7h4.462v.107zM48.238 10.944c0 1.168-.319 2.125-1.063 2.762-.637.532-1.593.85-2.868.85-.638 0-1.17 0-1.594-.106V7.862c.531-.106 1.169-.106 1.912-.106 1.17 0 2.02.213 2.657.744.53.531.956 1.381.956 2.444zm-1.169 0c0-.744-.212-1.382-.637-1.807-.425-.425-1.063-.637-1.807-.637-.318 0-.637 0-.85.106V13.6h.744c.85 0 1.488-.213 1.913-.637.425-.425.637-1.17.637-2.02zm7.119 1.062c0 .744-.213 1.382-.638 1.807-.425.53-1.063.743-1.806.743-.744 0-1.275-.212-1.7-.743-.425-.425-.638-1.063-.638-1.807 0-.743.213-1.38.638-1.806.425-.531 1.062-.744 1.806-.744s1.275.213 1.7.744c.425.425.638 1.063.638 1.806zm-1.063 0c0-.425-.106-.85-.319-1.168-.212-.425-.531-.532-.956-.532-.425 0-.744.213-.956.532-.213.318-.319.743-.319 1.168 0 .425.106.85.319 1.17.212.424.531.53.956.53.425 0 .744-.212.956-.637.213-.213.319-.638.319-1.063zm9.244-2.443L60.88 14.45h-.956l-.637-2.125c-.213-.531-.32-1.063-.425-1.594-.107.531-.213 1.063-.425 1.594L57.8 14.45h-.956L55.25 9.563h1.063l.53 2.337.32 1.594c.106-.425.212-.957.425-1.594l.637-2.338h.85l.637 2.232c.213.531.32 1.062.425 1.593l.32-1.593.637-2.232h1.275zm5.525 4.887H66.83v-2.762c0-.85-.319-1.276-.956-1.276-.319 0-.531.107-.744.32-.212.212-.319.53-.319.85v2.868H63.75V9.562h.956v.744c.106-.212.319-.425.531-.637.32-.213.638-.319.957-.319.425 0 .85.106 1.168.425.425.319.532.85.532 1.594v3.081zm2.976 0h-1.063V7.331h1.062v7.12zm6.374-2.444c0 .744-.212 1.382-.637 1.807-.425.53-1.063.743-1.807.743-.743 0-1.275-.212-1.7-.743-.425-.425-.637-1.063-.637-1.807 0-.743.212-1.38.637-1.806a2.563 2.563 0 011.807-.744c.743 0 1.275.213 1.7.744.425.425.637 1.063.637 1.806zm-1.062 0c0-.425-.107-.85-.32-1.168-.212-.425-.53-.532-.955-.532-.425 0-.744.213-.957.532-.212.318-.318.743-.318 1.168 0 .425.106.85.318 1.17.213.424.532.53.957.53.425 0 .743-.212.956-.637.212-.213.319-.638.319-1.063zm6.271 2.444h-.957l-.106-.531c-.319.425-.85.637-1.381.637-.425 0-.85-.106-1.063-.425-.212-.318-.424-.637-.424-.956 0-.637.212-1.062.743-1.381.531-.319 1.169-.425 2.125-.425v-.106c0-.638-.319-.957-.956-.957-.531 0-.85.107-1.275.32l-.213-.745c.425-.318.957-.425 1.7-.425 1.275 0 1.913.638 1.913 2.02v1.805c-.106.532-.106.85-.106 1.17zm-1.063-1.7v-.744c-1.168 0-1.806.32-1.806.957 0 .212.106.425.212.53a.811.811 0 00.532.213c.212 0 .425-.106.637-.212.213-.106.319-.319.425-.531v-.213zm7.22 1.7h-.957v-.744c-.318.638-.85.85-1.593.85-.638 0-1.063-.212-1.488-.637-.425-.425-.531-1.063-.531-1.806 0-.744.213-1.382.638-1.913a2.098 2.098 0 011.487-.637c.638 0 1.063.212 1.381.637V7.438h1.063v7.012zm-1.063-2.019v-1.169c-.106-.212-.212-.425-.425-.637-.212-.213-.425-.213-.743-.213-.425 0-.744.213-.957.532-.212.318-.319.743-.319 1.275 0 .531.107.85.32 1.168.212.32.53.532.956.532.318 0 .637-.107.85-.425.212-.425.318-.744.318-1.063zm10.306-.425c0 .744-.212 1.382-.637 1.807-.425.53-1.063.743-1.806.743-.744 0-1.275-.212-1.7-.743-.425-.425-.638-1.063-.638-1.807 0-.743.213-1.38.638-1.806.425-.531 1.062-.744 1.806-.744s1.275.213 1.7.744c.425.425.638 1.063.638 1.806zm-1.168 0c0-.425-.106-.85-.319-1.168-.213-.425-.531-.532-.956-.532-.425 0-.744.213-.956.532-.213.318-.32.743-.32 1.168 0 .425.107.85.32 1.17.212.424.53.53.956.53.425 0 .743-.212.956-.637.213-.213.319-.638.319-1.063zm7.015 2.444h-1.062v-2.762c0-.85-.319-1.276-.956-1.276-.319 0-.532.107-.744.32-.213.212-.319.53-.319.85v2.868h-1.062V9.562h.956v.744c.106-.212.319-.425.531-.637.319-.213.638-.319.956-.319.425 0 .85.106 1.169.425.425.319.531.85.531 1.594v3.081zm7.225-4.037h-1.168v2.337c0 .638.212.85.637.85h.531v.85c-.212.106-.531.106-.85.106-.425 0-.743-.106-.956-.425-.212-.212-.319-.743-.319-1.275v-2.443h-.743v-.85h.743v-.85l1.063-.32v1.17h1.169v.85h-.107zm5.74 4.037h-1.062v-2.762c0-.85-.319-1.275-.957-1.275-.531 0-.85.212-1.062.743v3.295h-1.063V7.33h1.063v2.975c.319-.53.85-.85 1.487-.85.425 0 .85.107 1.063.425.319.32.531.957.531 1.594v2.975zm5.841-2.656v.531h-3.188c0 .531.213.85.425 1.063a1.8 1.8 0 001.063.318c.531 0 .956-.106 1.275-.212l.212.744c-.425.212-.956.318-1.593.318-.744 0-1.382-.212-1.807-.637-.425-.425-.637-1.063-.637-1.806 0-.744.212-1.382.637-1.807.425-.531.957-.743 1.7-.743.744 0 1.275.212 1.594.743.213.319.319.85.319 1.488zm-.956-.319c0-.319-.107-.637-.213-.85-.212-.319-.425-.425-.85-.425-.319 0-.637.106-.85.425-.212.213-.319.531-.319.85h2.232z" fill="#fff"/> </symbol> <symbol fill="none" id="sprite-appstore" viewBox="0 0 133 44"> <title>appstore</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.128 0h122.32c1.783 0 2.429.186 3.081.535a3.63 3.63 0 011.512 1.512c.349.651.535 1.298.535 3.08v33.745c0 1.783-.186 2.43-.535 3.081a3.63 3.63 0 01-1.512 1.512c-.652.35-1.298.535-3.081.535H5.128c-1.783 0-2.43-.186-3.081-.535a3.635 3.635 0 01-1.513-1.512C.186 41.302 0 40.655 0 38.873V5.127c0-1.783.186-2.43.535-3.081A3.635 3.635 0 012.047.534C2.698.187 3.345 0 5.127 0z" fill="#F5F9FB"/> <path d="M30.397 23.024c-.03-3.313 2.779-4.924 2.907-5-1.59-2.264-4.057-2.573-4.923-2.598-2.071-.213-4.08 1.21-5.135 1.21-1.076 0-2.7-1.19-4.452-1.154-2.253.034-4.36 1.307-5.517 3.285-2.385 4.033-.606 9.959 1.68 13.218 1.143 1.598 2.479 3.379 4.228 3.317 1.711-.069 2.35-1.065 4.415-1.065 2.046 0 2.646 1.065 4.43 1.024 1.835-.028 2.991-1.603 4.095-3.214 1.32-1.83 1.852-3.632 1.873-3.724-.042-.015-3.565-1.329-3.6-5.299zm-3.37-9.742c.921-1.123 1.551-2.652 1.376-4.204-1.332.059-2.997.9-3.957 1.999-.848.968-1.606 2.556-1.41 4.048 1.495.11 3.032-.737 3.992-1.843zm19.996 3.361v-5.737h1.695c.507 0 .956.113 1.347.339.394.226.699.546.914.961.216.415.323.89.323 1.426v.288c0 .544-.109 1.022-.327 1.434-.215.413-.524.73-.926.954-.399.223-.857.335-1.375.335h-1.65zm.997-4.933v4.137h.65c.523 0 .924-.163 1.202-.489.281-.328.424-.798.43-1.41v-.32c0-.622-.136-1.098-.406-1.426-.27-.328-.663-.492-1.178-.492h-.698zm4.003 2.762c0-.418.083-.794.248-1.127.166-.336.398-.594.698-.773.3-.18.643-.271 1.032-.271.575 0 1.042.185 1.399.555.36.37.554.862.583 1.474l.004.224c0 .42-.081.796-.244 1.127a1.78 1.78 0 01-.694.769 1.97 1.97 0 01-1.04.271c-.601 0-1.083-.2-1.446-.599-.36-.401-.54-.936-.54-1.603v-.047zm.958.082c0 .439.09.783.272 1.033.18.247.433.37.756.37a.869.869 0 00.753-.378c.18-.252.271-.622.271-1.107 0-.431-.093-.773-.28-1.025a.882.882 0 00-.752-.378.877.877 0 00-.744.374c-.184.247-.276.617-.276 1.111zm7.561.769l.677-2.944h.934l-1.162 4.264h-.788l-.914-2.928-.899 2.928h-.788l-1.166-4.264h.934l.69 2.912.874-2.912h.721l.887 2.944zm3.14-2.943l.027.492c.316-.38.73-.571 1.242-.571.887 0 1.34.508 1.355 1.524v2.818h-.958V13.88c0-.27-.059-.47-.177-.6-.116-.13-.306-.196-.571-.196-.386 0-.674.174-.863.524v3.034h-.958v-4.264h.903zm4.621 4.263h-.957V10.59h.957v6.052zm.867-2.171c0-.418.083-.794.248-1.127.166-.336.398-.594.698-.773.3-.18.643-.271 1.032-.271.575 0 1.042.185 1.399.555.36.37.554.862.583 1.474l.004.224c0 .42-.082.796-.244 1.127a1.78 1.78 0 01-.694.769 1.97 1.97 0 01-1.04.271c-.602 0-1.084-.2-1.446-.599-.36-.401-.54-.936-.54-1.603v-.047zm.958.082c0 .439.09.783.272 1.033.18.247.433.37.756.37a.869.869 0 00.752-.378c.182-.252.272-.622.272-1.107 0-.431-.093-.773-.28-1.025a.882.882 0 00-.752-.378.877.877 0 00-.745.374c-.183.247-.275.617-.275 1.111zm6.362 2.089a1.478 1.478 0 01-.11-.398 1.49 1.49 0 01-1.118.476c-.429 0-.778-.122-1.049-.366a1.172 1.172 0 01-.405-.906c0-.455.168-.803.504-1.044.339-.245.822-.367 1.45-.367h.587v-.28c0-.22-.062-.396-.185-.527-.124-.134-.311-.201-.564-.201a.836.836 0 00-.535.165.5.5 0 00-.21.414h-.957c0-.234.078-.452.233-.654.155-.205.365-.365.63-.481.268-.116.566-.173.895-.173.499 0 .896.126 1.193.378.297.25.45.601.457 1.056v1.923c0 .383.054.69.162.918v.067h-.977zm-1.051-.69c.189 0 .366-.046.532-.138a.918.918 0 00.378-.37v-.804h-.516c-.355 0-.621.062-.8.185a.6.6 0 00-.268.524c0 .184.06.331.181.441.124.108.288.162.493.162zm2.691-1.473c0-.657.152-1.184.457-1.58.304-.4.713-.6 1.225-.6.452 0 .817.158 1.096.473v-2.182h.957v6.052h-.867l-.047-.442c-.286.347-.669.52-1.147.52-.499 0-.903-.2-1.213-.602-.307-.402-.461-.949-.461-1.64zm.957.082c0 .434.083.773.248 1.017a.818.818 0 00.714.362c.391 0 .677-.174.858-.524v-1.82c-.175-.341-.46-.512-.85-.512a.817.817 0 00-.718.37c-.168.244-.252.613-.252 1.107zm5.607-.09c0-.418.083-.794.248-1.127.166-.336.398-.594.698-.773.299-.18.643-.271 1.032-.271.575 0 1.041.185 1.398.555.36.37.555.862.584 1.474l.004.224c0 .42-.082.796-.245 1.127-.16.331-.391.587-.693.769a1.97 1.97 0 01-1.04.271c-.602 0-1.084-.2-1.446-.599-.36-.401-.54-.936-.54-1.603v-.047zm.957.082c0 .439.09.783.272 1.033.181.247.434.37.757.37a.87.87 0 00.752-.378c.181-.252.272-.622.272-1.107 0-.431-.093-.773-.28-1.025a.882.882 0 00-.752-.378.877.877 0 00-.745.374c-.184.247-.276.617-.276 1.111zm4.705-2.174l.027.492c.315-.38.73-.571 1.241-.571.888 0 1.34.508 1.356 1.524v2.818h-.958V13.88c0-.27-.059-.47-.177-.6-.116-.13-.306-.196-.571-.196-.386 0-.674.174-.863.524v3.034h-.958v-4.264h.903zm6.812-1.037v1.037h.752v.709h-.752v2.38c0 .162.031.28.094.354.066.071.182.106.347.106.11 0 .222-.013.335-.039v.74a2.334 2.334 0 01-.63.091c-.736 0-1.103-.405-1.103-1.217v-2.415h-.702v-.71h.701v-1.036h.958zm2.431 1.501a1.499 1.499 0 011.186-.543c.909 0 1.37.518 1.383 1.556v2.786h-.958v-2.75c0-.295-.064-.502-.193-.623-.126-.123-.312-.185-.559-.185-.384 0-.67.17-.86.512v3.046h-.957V10.59h.958v2.253zm5.417 3.877c-.606 0-1.099-.19-1.477-.57-.376-.384-.563-.894-.563-1.53v-.118c0-.425.081-.805.244-1.139a1.88 1.88 0 01.693-.784 1.83 1.83 0 01.993-.28c.581 0 1.028.186 1.344.556.317.37.476.895.476 1.572v.386h-2.785c.029.352.146.63.35.836.208.205.468.307.781.307.438 0 .795-.177 1.071-.532l.516.493a1.73 1.73 0 01-.685.595 2.15 2.15 0 01-.958.208zm-.114-3.652a.813.813 0 00-.638.276c-.16.184-.263.44-.307.768h1.824v-.07c-.021-.321-.107-.563-.256-.726-.15-.165-.358-.248-.623-.248zM53.555 31.284H49.39l-.872 2.505h-1.943l4.063-10.757h1.677l4.07 10.757h-1.95l-.879-2.505zm-3.642-1.507h3.118l-1.559-4.462-1.559 4.462zm14.17.096c0 1.236-.281 2.224-.843 2.963-.561.734-1.315 1.1-2.26 1.1-.877 0-1.579-.288-2.106-.864v3.79H57.08V25.795h1.655l.074.813c.527-.64 1.243-.96 2.15-.96.975 0 1.738.364 2.29 1.093.556.724.835 1.731.835 3.021v.111zm-1.788-.155c0-.798-.16-1.43-.48-1.898-.316-.468-.769-.702-1.36-.702-.733 0-1.26.303-1.58.909v3.546c.325.62.856.93 1.595.93.571 0 1.017-.229 1.337-.687.325-.463.488-1.162.488-2.098zm10.313.155c0 1.236-.28 2.224-.842 2.963-.562.734-1.315 1.1-2.26 1.1-.878 0-1.58-.288-2.106-.864v3.79h-1.796V25.795h1.655l.074.813c.527-.64 1.244-.96 2.15-.96.975 0 1.738.364 2.29 1.093.557.724.835 1.731.835 3.021v.111zm-1.788-.155c0-.798-.16-1.43-.48-1.898-.315-.468-.768-.702-1.36-.702-.733 0-1.26.303-1.58.909v3.546c.325.62.857.93 1.595.93.572 0 1.017-.229 1.337-.687.326-.463.488-1.162.488-2.098zm12.877 1.3c0-.472-.168-.837-.503-1.093-.33-.256-.928-.515-1.795-.776-.867-.26-1.556-.551-2.069-.871-.98-.616-1.47-1.419-1.47-2.409 0-.866.353-1.58 1.057-2.142.709-.561 1.627-.842 2.755-.842.749 0 1.416.138 2.002.413.586.276 1.047.67 1.382 1.183a3 3 0 01.502 1.691h-1.862c0-.561-.177-1-.531-1.315-.35-.32-.852-.48-1.508-.48-.61 0-1.085.13-1.425.392-.335.26-.503.625-.503 1.093 0 .394.183.724.547.99.365.26.965.517 1.803.768.837.246 1.51.53 2.016.85.508.315.88.68 1.116 1.093.236.409.355.889.355 1.44 0 .897-.345 1.611-1.035 2.143-.684.527-1.615.79-2.792.79a5.32 5.32 0 01-2.15-.428c-.65-.29-1.157-.69-1.522-1.197-.36-.507-.54-1.098-.54-1.773h1.87c0 .61.202 1.084.606 1.419.404.334.982.502 1.736.502.65 0 1.137-.13 1.462-.392a1.28 1.28 0 00.496-1.049zm5.584-7.166v1.943h1.411v1.33h-1.41v4.462c0 .306.059.527.177.665.123.133.34.2.65.2.207 0 .416-.025.628-.074v1.389a4.42 4.42 0 01-1.182.17c-1.38 0-2.069-.761-2.069-2.283v-4.529h-1.315v-1.33h1.315v-1.943h1.795zm2.232 5.866c0-.783.155-1.487.465-2.113.31-.63.746-1.113 1.308-1.448.561-.34 1.206-.51 1.935-.51 1.079 0 1.953.348 2.623 1.042.674.695 1.039 1.616 1.093 2.763l.007.421c0 .788-.152 1.493-.458 2.113-.3.62-.734 1.1-1.3 1.44-.561.34-1.211.51-1.95.51-1.128 0-2.032-.374-2.711-1.122-.675-.754-1.013-1.756-1.013-3.007v-.089zm1.795.155c0 .823.17 1.468.51 1.936.34.463.812.694 1.418.694.606 0 1.076-.236 1.41-.709.34-.473.51-1.165.51-2.076 0-.808-.174-1.448-.524-1.92-.345-.473-.815-.71-1.411-.71-.586 0-1.052.234-1.396.702-.345.463-.517 1.158-.517 2.083zm11.34-2.437a4.457 4.457 0 00-.732-.06c-.822 0-1.376.316-1.662.946v5.467h-1.795v-7.994h1.714l.044.894c.433-.694 1.034-1.041 1.803-1.041.256 0 .467.034.635.103l-.007 1.684zm4.506 6.501c-1.138 0-2.061-.358-2.77-1.072-.705-.719-1.057-1.674-1.057-2.866v-.222c0-.797.153-1.51.458-2.135a3.54 3.54 0 011.3-1.47 3.429 3.429 0 011.862-.524c1.088 0 1.928.347 2.519 1.041.596.695.894 1.677.894 2.948v.724h-5.223c.054.66.273 1.182.658 1.566.389.384.876.576 1.462.576.823 0 1.493-.332 2.01-.997l.967.923a3.25 3.25 0 01-1.285 1.116c-.532.261-1.13.392-1.795.392zm-.214-6.849c-.493 0-.892.173-1.197.517-.301.345-.493.825-.576 1.441h3.42v-.133c-.039-.6-.199-1.054-.48-1.36-.281-.31-.67-.465-1.167-.465z" fill="#135"/> </symbol> <symbol fill="none" id="sprite-arrow-dropdown" viewBox="0 0 10 7"> <title>arrow-dropdown</title> <path d="M9 1L5 5 1 1" stroke="#fff" stroke-width="1.5"/> </symbol> <symbol fill="none" id="sprite-atom" viewBox="0 0 100 100"> <title>atom</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50zm-3.8-74.867c-.733 3.467-1.315 7.668-1.691 12.356 2.066.985 4.199 2.06 6.372 3.218a160.19 160.19 0 016.079-3.064c-.377-4.75-.963-9.005-1.705-12.51-.671-3.176-1.461-5.695-2.314-7.402-.428-.855-.851-1.466-1.252-1.854-.398-.385-.717-.499-.961-.499s-.563.114-.96.499c-.402.388-.825.999-1.253 1.854-.853 1.707-1.643 4.226-2.315 7.402zM31.733 32.27c3.319 1.077 7.146 2.604 11.27 4.512.382-4.509.954-8.57 1.671-11.96.683-3.229 1.505-5.892 2.442-7.767.468-.935.984-1.714 1.557-2.27.576-.557 1.266-.939 2.055-.939.789 0 1.479.382 2.055.94.573.555 1.09 1.334 1.557 2.27.937 1.874 1.76 4.537 2.442 7.765.725 3.43 1.302 7.544 1.684 12.114a116.684 116.684 0 017.97-3.36 2.444 2.444 0 011.241-1.948 2.527 2.527 0 013.084.464c2.785-.856 5.207-1.38 7.113-1.505 1.06-.07 2.003-.02 2.78.19.779.212 1.46.608 1.854 1.28.395.671.403 1.45.2 2.218-.202.766-.63 1.594-1.222 2.46-1.183 1.735-3.118 3.767-5.622 5.962-2.594 2.275-5.833 4.755-9.55 7.298 3.818 2.6 7.14 5.139 9.789 7.463 2.503 2.195 4.438 4.227 5.62 5.962.591.866 1.02 1.695 1.222 2.46.203.77.195 1.547-.2 2.22-.395.67-1.076 1.066-1.855 1.278-.776.21-1.72.26-2.78.19-2.12-.14-4.877-.772-8.063-1.806-3.403-1.105-7.34-2.682-11.584-4.658-.382 4.555-.958 8.655-1.681 12.076-.683 3.228-1.505 5.89-2.442 7.766-.468.935-.984 1.715-1.557 2.27-.576.557-1.266.939-2.055.939-.79 0-1.479-.382-2.055-.94-.573-.554-1.09-1.334-1.557-2.27-.843-1.685-1.592-4.008-2.231-6.806-1.116-.244-1.95-1.223-1.95-2.393 0-.845.434-1.59 1.095-2.03a111.8 111.8 0 01-1.024-8.464c-4.218 1.96-8.131 3.526-11.516 4.623-3.186 1.034-5.944 1.665-8.064 1.805-1.059.07-2.003.02-2.78-.19-.779-.212-1.46-.608-1.854-1.28-.395-.671-.403-1.449-.2-2.218.202-.766.631-1.594 1.222-2.46 1.183-1.735 3.119-3.766 5.622-5.961 2.69-2.359 6.072-4.938 9.963-7.579a115.658 115.658 0 01-6.992-5.136 2.53 2.53 0 01-2.337-.083 2.433 2.433 0 01-1.133-2.857c-2.145-1.943-3.817-3.743-4.881-5.303-.59-.866-1.02-1.695-1.221-2.46-.203-.77-.195-1.548.2-2.22.395-.67 1.076-1.067 1.855-1.278.776-.21 1.72-.26 2.779-.19 2.12.14 4.878.773 8.064 1.806zm43.093 9.283c-2.653 2.327-6.011 4.886-9.89 7.514a160.635 160.635 0 00-6.013-3.801 154.612 154.612 0 00-.33-6.695 117.273 117.273 0 018.23-3.501c.713 1.099 2.188 1.46 3.348.802a2.44 2.44 0 001.234-2.374c2.646-.803 4.875-1.271 6.574-1.383.967-.064 1.718-.009 2.26.138.538.146.797.361.92.569.122.207.18.536.04 1.067-.141.535-.468 1.201-1.007 1.992-1.078 1.58-2.903 3.512-5.366 5.672zM63.55 49.996a158.956 158.956 0 00-4.584-2.905 171.345 171.345 0 010 5.82c1.589-.973 3.12-1.947 4.584-2.915zM57.08 39.29c.11 1.627.195 3.308.254 5.03a176.267 176.267 0 00-4.823-2.734c1.551-.81 3.078-1.577 4.57-2.296zm-2.838 5.021a174.13 174.13 0 00-3.362-1.86 174.836 174.836 0 00-6.814 3.857 167.834 167.834 0 000 7.388 175.605 175.605 0 006.812 3.872 174.215 174.215 0 006.508-3.701 167.639 167.639 0 000-7.728 175.972 175.972 0 00-3.144-1.828zm-7.723-1.21a176.9 176.9 0 012.73-1.517 158.803 158.803 0 00-4.863-2.45c-.118 1.73-.21 3.519-.27 5.356.79-.465 1.591-.928 2.403-1.389zM42.467 50c0 .922.007 1.836.022 2.74a157.622 157.622 0 01-4.32-2.746 158.1 158.1 0 014.32-2.734c-.015.904-.022 1.818-.022 2.74zm.061 4.567a159.809 159.809 0 01-5.752-3.648c-4.053 2.726-7.555 5.385-10.302 7.794-2.463 2.16-4.288 4.091-5.366 5.67-.54.792-.866 1.459-1.007 1.993-.14.532-.081.86.04 1.068.123.207.382.422.92.568.543.147 1.293.203 2.26.139 1.931-.128 4.546-.715 7.68-1.731 3.46-1.122 7.502-2.75 11.876-4.805a154.512 154.512 0 01-.349-7.048zm0-9.131a160.545 160.545 0 00-5.75 3.63 116.33 116.33 0 01-7.247-5.288 2.429 2.429 0 00-.966-3.251 2.53 2.53 0 00-2.71.136c-2.03-1.85-3.556-3.514-4.504-4.904-.54-.791-.866-1.458-1.008-1.993-.14-.531-.08-.86.042-1.067.122-.208.381-.422.92-.568.542-.147 1.292-.202 2.26-.138 1.93.127 4.545.715 7.679 1.732 3.394 1.101 7.35 2.69 11.63 4.692-.163 2.248-.28 4.596-.346 7.019zm4.23 11.61a175.391 175.391 0 01-2.642-1.53c.061 1.845.153 3.642.272 5.378a159.614 159.614 0 004.864-2.458c-.827-.452-1.659-.916-2.494-1.39zm-2.247 5.495c2.066-.99 4.197-2.068 6.368-3.227 2.07 1.102 4.103 2.13 6.078 3.077-.377 4.736-.962 8.98-1.702 12.476-.671 3.176-1.461 5.695-2.314 7.402-.428.855-.851 1.466-1.252 1.854-.398.385-.717.499-.961.499s-.563-.114-.96-.499c-.402-.388-.825-.999-1.253-1.854-.75-1.502-1.452-3.633-2.068-6.286a2.45 2.45 0 001.475-2.238c0-1.316-1.056-2.39-2.381-2.449a112.124 112.124 0 01-1.03-8.755zm14.412-7.802a154.8 154.8 0 01-.333 6.727c4.4 2.07 8.468 3.712 11.946 4.84 3.134 1.017 5.749 1.605 7.68 1.732.967.064 1.717.01 2.259-.138.538-.146.798-.36.92-.568.122-.208.182-.536.041-1.068-.14-.534-.468-1.201-1.007-1.992-1.077-1.58-2.902-3.513-5.364-5.672-2.708-2.375-6.148-4.992-10.126-7.678a159.755 159.755 0 01-6.016 3.817zm-6.418 3.695c1.552.815 3.08 1.586 4.573 2.31.11-1.636.197-3.325.256-5.057a178.18 178.18 0 01-4.83 2.747zm-1.777-3.991c2.41 0 4.364-1.92 4.364-4.29 0-2.369-1.954-4.29-4.364-4.29s-4.364 1.921-4.364 4.29c0 2.37 1.954 4.29 4.364 4.29z" fill="url(#pain3sdq_linear)"/> <defs> <linearGradient id="pain3sdq_linear" x1="49.21" y1="0" x2="49.21" y2="98.462" gradientUnits="userSpaceOnUse"> <stop stop-color="#A8A7FF"/> <stop offset="1" stop-color="#6E6CFF"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-awc-bnb" viewBox="0 0 65 65"> <title>awc-bnb</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 32.5C0 14.55 14.55 0 32.5 0S65 14.55 65 32.5 50.45 65 32.5 65 0 50.45 0 32.5zm24.463-16.105L12 51l7.718-2.72 10.646-29.561c.648-1.635 1.396-2.224 2.636-2.25 1.24.026 1.988.615 2.636 2.25l10.646 29.56L54 51 41.537 16.395c-1.581-4.04-4.53-6.327-8.45-6.393V10a8.527 8.527 0 00-.175 0v.002c-3.92.066-6.868 2.353-8.449 6.393zm8.61 26.901c2.955 0 5.35-2.45 5.35-5.473 0-3.023-2.395-5.473-5.35-5.473-2.954 0-5.35 2.45-5.35 5.473 0 3.023 2.396 5.473 5.35 5.473z" fill="url(#pain3dokp_linear)"/> <defs> <linearGradient id="pain3dokp_linear" x1="0" y1="0" x2="0" y2="65" gradientUnits="userSpaceOnUse"> <stop stop-color="#F8D175"/> <stop offset="1" stop-color="#F4C148"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-awc-erc20" viewBox="0 0 20 20"> <title>awc-erc20</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47717 4.47711 0 10 0C15.5228 0 20 4.47717 20 10C20 15.5229 15.5228 20 10 20C4.47711 20 0 15.5229 0 10ZM7.52708 5.04455L3.69231 15.6923L6.06692 14.8553L9.34274 5.7596C9.54212 5.25652 9.77231 5.07542 10.1538 5.06742C10.5354 5.07542 10.7656 5.25652 10.965 5.7596L14.2408 14.8553L16.6154 15.6923L12.7806 5.04455C12.294 3.80142 11.3868 3.09769 10.1808 3.07738V3.07692C10.1718 3.07692 10.1628 3.07695 10.1538 3.07705C10.1449 3.07695 10.1359 3.07692 10.1269 3.07692V3.07738C8.92086 3.09769 8.01366 3.80142 7.52708 5.04455ZM10.1764 13.3219C11.0854 13.3219 11.8224 12.5679 11.8224 11.6379C11.8224 10.7078 11.0854 9.95385 10.1764 9.95385C9.26726 9.95385 8.53031 10.7078 8.53031 11.6379C8.53031 12.5679 9.26726 13.3219 10.1764 13.3219Z" fill="url(#paint7_linear)"/> <defs> <linearGradient id="paint7_linear" x1="0" y1="0" x2="0" y2="20" gradientUnits="userSpaceOnUse"> <stop stop-color="#42C1FD"/> <stop offset="1" stop-color="#1F8EFA"/> </linearGradient> </defs> <symbol> <symbol fill="none" id="sprite-xlm" viewBox="0 0 65 65"> <title>xlm</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 65C50.4493 65 65 50.4493 65 32.5C65 14.5507 50.4493 0 32.5 0C14.5507 0 0 14.5507 0 32.5C0 50.4493 14.5507 65 32.5 65ZM51.8621 28.1718L54 27.0681V23.2894L11 45.4894V49.2681L47.3412 30.5059C47.4328 31.1836 47.4801 31.8756 47.4801 32.5787C47.4801 40.9264 40.808 47.6936 32.5776 47.6936C29.8933 47.6936 27.3749 46.9738 25.1995 45.7142L21.7882 47.4754C24.7959 49.6924 28.4974 51 32.5 51C42.5736 51 50.7401 42.7172 50.7401 32.5C50.7401 31.8488 50.7069 31.2055 50.6421 30.5717C50.5421 29.5922 50.9968 28.6185 51.8621 28.1718ZM54 15.7319V19.5106L11 41.7106V37.9319L13.1379 36.8282C14.0031 36.3815 14.4578 35.4077 14.3578 34.4282C14.2931 33.7945 14.2599 33.1512 14.2599 32.5C14.2599 22.2827 22.4263 14 32.5 14C36.5038 14 40.2063 15.3084 43.2146 17.5266L39.7397 19.3206C37.6144 18.137 35.1735 17.4638 32.5776 17.4638C24.3472 17.4638 17.6751 24.231 17.6751 32.5787C17.6751 33.205 17.7126 33.8224 17.7856 34.4287L54 15.7319Z" fill="url(#paintd_linear)"/> <defs> <linearGradient id="painepllfgg_linear" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse"> <stop stop-color="#8785FF"/> <stop offset="1" stop-color="#C4C4C4"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-knowledge" viewBox="0 0 18 16"> <title>knowledge</title> <path d="M2.14286 3.89424e-06V12.4286C4.88425 12.4138 6.92708 13.9092 8.57143 15.2813V2.57143C6.75179 1.04624 4.70643 -0.00233182 2.14286 3.89424e-06ZM15.8571 3.89424e-06C13.2936 -0.00233182 11.2482 1.04624 9.42857 2.57143V15.2813C11.0729 13.9092 13.1158 12.4138 15.8571 12.4286V3.89424e-06ZM0 1.71429V14.1429L7.5 15.4286C6.07462 14.3539 4.27657 13.2741 2.14286 13.2857H1.71429C1.48989 13.2857 1.28574 13.0815 1.28571 12.8571V12.4286V1.89509L0 1.71429ZM18 1.71429L16.7143 1.89509V12.4286V12.8571C16.7143 13.0815 16.5101 13.2857 16.2857 13.2857H15.8571C13.7234 13.2741 11.9254 14.3539 10.5 15.4286L18 14.1429V1.71429Z" fill="url(#paintz_linear)"/> <defs> <linearGradient id="paintz_linear" x1="1.9206e-07" y1="15" x2="19" y2="0.500001" gradientUnits="userSpaceOnUse"> <stop stop-color="#6B69F2"/> <stop offset="1" stop-color="#9A5FD6"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-explorer" viewBox="0 0 20 20"> <title>explorer</title> <path d="M9.70529 1.44505L2.67383 4.96078L9.70529 8.47651L16.7367 4.96078L9.70529 1.44505Z" fill="url(#paint0_linear)"/> <path d="M8.53146 10.3516L1.5 6.83586V15.0392L8.53146 18.555V10.3516Z" fill="url(#paint1_linear)"/> <path d="M17.9084 6.83586L10.877 10.3516V18.555L17.9997 14.8886L17.9084 6.83586Z" fill="url(#paint2_linear)"/> <defs> <linearGradient id="paint0p_linear" x1="2.67383" y1="5.03891" x2="16.7367" y2="5.03891" gradientUnits="userSpaceOnUse"> <stop stop-color="#169DC9"/> <stop offset="1" stop-color="#35C192"/> </linearGradient> <linearGradient id="paint1_linear" x1="1.5" y1="12.8256" x2="8.53146" y2="12.8256" gradientUnits="userSpaceOnUse"> <stop stop-color="#169DC9"/> <stop offset="1" stop-color="#35C192"/> </linearGradient> <linearGradient id="paint2_linear" x1="10.877" y1="12.8256" x2="17.9997" y2="12.8256" gradientUnits="userSpaceOnUse"> <stop stop-color="#169DC9"/> <stop offset="1" stop-color="#35C192"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-academy" viewBox="0 0 20 17"> <title>academy</title> <path d="M3.63636 9.25455V12.8909L10 16.3636L16.3636 12.8909V9.25455L10 12.7273L3.63636 9.25455ZM10 0L0 5.45455L10 10.9091L18.1818 6.44545V12.7273H20V5.45455L10 0Z" fill="url(#paintac_linear)"/> <defs> <linearGradient id="paintac_linear" x1="-8.88827e-08" y1="18.5" x2="18" y2="8" gradientUnits="userSpaceOnUse"> <stop stop-color="#F05757"/> <stop offset="1" stop-color="#F18C43"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-blog" viewBox="0 0 18 18"> <title>blog</title> <path d="M2.33464 4.00001H0.667969V15.6667C0.667969 16.5833 1.41797 17.3333 2.33464 17.3333H14.0013V15.6667H2.33464V4.00001ZM15.668 0.666672H5.66797C4.7513 0.666672 4.0013 1.41667 4.0013 2.33334V12.3333C4.0013 13.25 4.7513 14 5.66797 14H15.668C16.5846 14 17.3346 13.25 17.3346 12.3333V2.33334C17.3346 1.41667 16.5846 0.666672 15.668 0.666672ZM14.8346 8.16667H6.5013V6.50001H14.8346V8.16667ZM11.5013 11.5H6.5013V9.83334H11.5013V11.5ZM14.8346 4.83334H6.5013V3.16667H14.8346V4.83334Z" fill="url(#paint0_linear)"/> <defs> <linearGradient id="paint0_linear" x1="5.88354e-07" y1="18" x2="17" y2="1" gradientUnits="userSpaceOnUse"> <stop stop-color="#1FA4ED"/> <stop offset="0.0001" stop-color="#1FA3EC"/> <stop offset="1" stop-color="#1CCAD6"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-membership" viewBox="0 0 19 13"> <title>membership</title> <path d="M17.1926 0.700012H1.80737C1.08737 0.700012 0.5 1.28738 0.5 2.00738V10.8937C0.5 11.6137 1.08737 12.2011 1.80737 12.2011H17.1926C17.9126 12.2011 18.5 11.6137 18.5 10.8937V2.00738C18.5 1.26843 17.9126 0.700012 17.1926 0.700012ZM9.17789 6.00528L7.92737 7.08528C7.81368 7.18001 7.75684 7.33159 7.79474 7.48317L8.17368 9.0937C8.24947 9.43475 7.87053 9.71896 7.56737 9.52949L6.16526 8.67685C6.03263 8.60106 5.88105 8.60106 5.74842 8.67685L4.34632 9.52949C4.04316 9.71896 3.66421 9.43475 3.74 9.0937L4.11895 7.48317C4.15684 7.33159 4.1 7.18001 3.98632 7.08528L2.73579 6.00528C2.47053 5.77791 2.60316 5.32317 2.96316 5.30422L4.61158 5.17159C4.76316 5.15264 4.89579 5.05791 4.95263 4.92528L5.59684 3.40949C5.72947 3.08738 6.20316 3.08738 6.33579 3.40949L6.98 4.92528C7.03684 5.05791 7.16947 5.15264 7.32105 5.17159L8.96947 5.30422C9.31053 5.32317 9.44316 5.75896 9.17789 6.00528ZM15.6579 9.83264H11.0916C10.8074 9.83264 10.58 9.60528 10.58 9.32106C10.58 9.03685 10.8074 8.80949 11.0916 8.80949H15.6579C15.9421 8.80949 16.1695 9.03685 16.1695 9.32106C16.1695 9.60528 15.9421 9.83264 15.6579 9.83264ZM15.6579 6.95264H11.0916C10.8074 6.95264 10.58 6.72528 10.58 6.44106C10.58 6.15685 10.8074 5.92949 11.0916 5.92949H15.6579C15.9421 5.92949 16.1695 6.15685 16.1695 6.44106C16.1884 6.72528 15.9421 6.95264 15.6579 6.95264ZM15.6579 4.09159H11.0916C10.8074 4.09159 10.58 3.86422 10.58 3.58001C10.58 3.2958 10.8074 3.06843 11.0916 3.06843H15.6579C15.9421 3.06843 16.1695 3.2958 16.1695 3.58001C16.1695 3.86422 15.9421 4.09159 15.6579 4.09159Z" fill="url(#paint0_linear)"/> <defs> <linearGradient id="paint0_linear" x1="0.5" y1="6.57833" x2="18.5" y2="6.57833" gradientUnits="userSpaceOnUse"> <stop stop-color="#169DC9"/> <stop offset="1" stop-color="#35C192"/> </linearGradient> </defs> </symbol> <symbol fill="#3692FE" id="sprite-assets" viewBox="0 0 20 14"> <title>assets</title> <path d="M15.3577 10.9524C17.282 10.9524 18.9134 10.4104 20.0006 9.51569C20.0006 9.7464 20.0006 9.98497 20.0006 10.2381C20.0006 11.8669 18.0048 13.0952 15.3577 13.0952C12.7106 13.0952 10.7148 11.8669 10.7148 10.2381C10.7148 9.99997 10.7148 9.75688 10.7148 9.51569C11.802 10.4104 13.4334 10.9524 15.3577 10.9524Z" fill="#3692FE"/> <path d="M15.3577 7.38094C17.282 7.38094 18.9134 6.83904 20.0006 5.94427C20.0006 6.17499 20.0006 6.41356 20.0006 6.66666C20.0006 8.29547 18.0048 9.5238 15.3577 9.5238C12.7106 9.5238 10.7148 8.29547 10.7148 6.66666C10.7148 6.42856 10.7148 6.18547 10.7148 5.94427C11.802 6.83904 13.4334 7.38094 15.3577 7.38094Z" fill="#3692FE"/> <path d="M10.7148 2.85714C10.7148 1.22833 12.7106 0 15.3577 0C18.0048 0 20.0006 1.22833 20.0006 2.85714C20.0006 4.48595 18.0048 5.71429 15.3577 5.71429C12.7106 5.71429 10.7148 4.48595 10.7148 2.85714Z" fill="#3692FE"/> <path d="M9.28571 6.66665C9.28571 8.29546 7.29 9.5238 4.64286 9.5238C1.99571 9.5238 0 8.29546 0 6.66665C0 5.03784 1.99571 3.80951 4.64286 3.80951C7.29 3.80951 9.28571 5.03784 9.28571 6.66665Z" fill="#3692FE"/> <path d="M4.64286 10.9524C6.56714 10.9524 8.19857 10.4104 9.28571 9.51569C9.28571 9.7464 9.28571 9.98497 9.28571 10.2381C9.28571 11.8669 7.29 13.0952 4.64286 13.0952C1.99571 13.0952 0 11.8669 0 10.2381C0 9.99997 0 9.75688 0 9.51569C1.08714 10.4104 2.71857 10.9524 4.64286 10.9524Z" fill="#3692FE"/> </symbol> <symbol fill="none" id="sprite-btc" viewBox="0 0 60 60"> <title>btc</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M29.196 27.385l1.774-7.115c.204.051.453.106.735.169 2.51.555 7.65 1.693 6.71 5.468-.922 3.69-6.21 2.278-8.634 1.631l-.585-.153zm-2.852 11.436l1.956-7.845c.243.06.54.127.876.203 3.008.675 9.17 2.058 8.135 6.209-1.01 4.06-7.366 2.381-10.273 1.613-.262-.07-.495-.13-.694-.18zM45.457 25.97c-.468 3.163-2.222 4.695-4.55 5.232 3.197 1.665 4.824 4.217 3.274 8.642-1.923 5.496-6.493 5.96-12.57 4.81l-1.474 5.91-3.564-.888 1.456-5.83a134.96 134.96 0 01-2.84-.738l-1.46 5.859-3.56-.888 1.475-5.922c-.833-.213-1.678-.44-2.54-.655l-4.638-1.156 1.769-4.08s2.626.699 2.59.647c1.009.25 1.457-.408 1.633-.846l2.33-9.343c.132.031.258.064.377.093a2.95 2.95 0 00-.37-.118l1.662-6.67c.044-.757-.217-1.712-1.66-2.072.056-.038-2.588-.644-2.588-.644l.948-3.806 4.914 1.227-.004.018c.739.184 1.5.359 2.275.535l1.461-5.852 3.561.888-1.43 5.738c.956.218 1.918.438 2.854.672l1.421-5.7 3.564.888-1.46 5.854c4.5 1.55 7.79 3.873 7.144 8.195zM30 0C13.431 0 0 13.431 0 30c0 16.569 13.431 30 30 30 16.569 0 30-13.431 30-30C60 13.431 46.569 0 30 0z" fill="url(#pain3asc_linear)"/> <defs> <linearGradient id="pain3asc_linear" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse"> <stop stop-color="#FFB862"/> <stop offset=".982" stop-color="#F76A1A"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-debian" viewBox="0 0 86 86"> <title>debian</title> <rect width="86" height="86" rx="6" fill="#fff"/> <path d="M47.547 44.414c-.985.013.185.506 1.471.705.357-.278.678-.558.965-.83-.8.195-1.615.2-2.436.125zm5.288-1.318c.59-.81 1.016-1.697 1.167-2.613-.132.653-.485 1.216-.82 1.812-1.841 1.16-.174-.688-.001-1.391-1.98 2.494-.273 1.495-.346 2.192zm1.951-5.079c.12-1.774-.35-1.212-.507-.537.184.097.33 1.252.507.537zM43.81 13.767c.527.094 1.137.166 1.05.292.577-.127.707-.242-1.05-.292zm1.05.293l-.37.076.345-.031.025-.046z" fill="#BD093D"/> <path d="M61.257 38.69c.06 1.592-.465 2.366-.938 3.735l-.853.424c-.697 1.354.07.86-.43 1.936-1.09.968-3.3 3.026-4.009 3.215-.517-.011.35-.61.464-.845-1.457 1-1.17 1.5-3.397 2.11l-.065-.146c-5.492 2.584-13.122-2.537-13.022-9.523-.058.443-.166.332-.288.51-.283-3.594 1.66-7.204 4.939-8.68 3.206-1.586 6.965-.936 9.26 1.206-1.26-1.652-3.772-3.404-6.746-3.242-2.915.047-5.643 1.9-6.553 3.911-1.493.94-1.667 3.624-2.317 4.116-.876 6.435 1.647 9.214 5.915 12.485.67.452.188.521.278.866-1.418-.664-2.715-1.666-3.784-2.893.568.829 1.179 1.635 1.97 2.268-1.339-.452-3.125-3.24-3.645-3.353 2.304 4.126 9.348 7.236 13.038 5.693-1.707.063-3.876.035-5.793-.674-.808-.415-1.902-1.273-1.706-1.433 5.035 1.88 10.234 1.423 14.59-2.068 1.11-.864 2.32-2.333 2.67-2.352-.527.792.09.38-.315 1.08 1.103-1.78-.48-.725 1.14-3.075l.6.824c-.225-1.48 1.836-3.274 1.626-5.612.473-.715.527.77.026 2.415.696-1.825.184-2.118.362-3.624.192.506.447 1.044.577 1.578-.454-1.763.463-2.969.691-3.994-.225-.099-.7.78-.809-1.303.017-.904.253-.474.343-.697-.176-.102-.643-.796-.925-2.125.203-.314.548.81.828.855-.18-1.056-.49-1.863-.503-2.675-.817-1.707-.29.229-.951-.733-.87-2.712.721-.63.83-1.861 1.317 1.909 2.068 4.87 2.414 6.095-.264-1.495-.69-2.943-1.21-4.345.402.17-.645-3.074.522-.926-1.245-4.579-5.326-8.858-9.081-10.865.458.42 1.038.947.83 1.03-1.868-1.11-1.54-1.198-1.807-1.668-1.52-.619-1.621.051-2.627.002-2.868-1.522-3.42-1.36-6.06-2.313l.12.562c-1.9-.633-2.213.239-4.266.001-.124-.097.658-.353 1.303-.446-1.837.243-1.751-.363-3.549.067.443-.311.912-.517 1.384-.781-1.497.09-3.576.871-2.934.16-2.443 1.091-6.782 2.622-9.217 4.905l-.077-.512c-1.115 1.34-4.865 4-5.164 5.736l-.298.07c-.58.982-.956 2.096-1.417 3.107-.759 1.294-1.113.498-1.005.701-1.493 3.028-2.236 5.572-2.876 7.66.456.681.011 4.108.183 6.85-.749 13.546 9.506 26.696 20.717 29.732 1.643.589 4.085.568 6.164.626-2.452-.702-2.768-.372-5.158-1.204-1.723-.813-2.1-1.739-3.32-2.799l.483.854c-2.394-.847-1.392-1.048-3.34-1.665l.516-.673c-.776-.06-2.055-1.307-2.404-2l-.85.034c-1.019-1.257-1.563-2.165-1.523-2.868l-.274.49c-.31-.534-3.752-4.72-1.967-3.746-.331-.302-.772-.492-1.25-1.362l.363-.415c-.858-1.105-1.581-2.522-1.526-2.995.458.619.776.735 1.091.841-2.17-5.383-2.292-.296-3.934-5.479l.347-.028c-.266-.403-.429-.837-.642-1.265l.151-1.507c-1.561-1.803-.436-7.678-.21-10.898.155-1.31 1.303-2.704 2.176-4.891l-.532-.091c1.017-1.773 5.804-7.12 8.022-6.846 1.074-1.35-.214-.006-.424-.345 2.36-2.441 3.102-1.724 4.694-2.164 1.716-1.019-1.474.398-.66-.388 2.969-.758 2.103-1.724 5.975-2.108.41.232-.947.358-1.287.66 2.472-1.211 7.825-.935 11.304.67 4.033 1.887 8.567 7.46 8.747 12.704l.204.055c-.103 2.085.319 4.496-.414 6.71l.495-1.049z" fill="#BD093D"/> <path d="M36.8 45.766l-.14.69c.648.88 1.163 1.834 1.989 2.52-.595-1.16-1.036-1.64-1.85-3.21zm1.524-.059c-.343-.38-.545-.836-.773-1.29.217.798.663 1.485 1.076 2.184l-.303-.894zm27.089-5.887l-.145.363a17.52 17.52 0 01-1.717 5.478 17.271 17.271 0 001.862-5.842zM44.009 13.294c.665-.243 1.636-.134 2.345-.294-.922.077-1.84.123-2.745.239l.4.055zM20.623 25.731c.154 1.42-1.068 1.972.27 1.034.72-1.618-.279-.446-.27-1.034zm-1.578 6.576c.31-.948.364-1.516.482-2.065-.852 1.09-.393 1.323-.482 2.065z" fill="#BD093D"/> </symbol> <symbol fill="none" id="sprite-doge" viewBox="0 0 100 100"> <title>doge</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50zM33.17 36.174v26.83h-7.017v12.382H50.92v-.005h1.263c4.494.005 8.489.01 11.984-1.647 4.1-1.929 7.202-5.27 9.39-8.874 2.216-3.603 3.365-8.536 3.365-13.325v-3.243c-.027-4.672-1.15-8.81-3.365-12.413-2.188-3.603-5.346-6.833-9.39-8.786-3.914-1.89-6.668-2.441-13.248-2.475v-.002H26.153v11.558h7.017zm14.447 0v26.829h6.191c3.302 0 7.017-7.25 7.017-11.468v-2.964c0-3.936-3.096-12.398-7.017-12.398h-6.191z" fill="url(#painepllfgg_linear)"/> <defs> <linearGradient id="painepllfgg_linear" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse"> <stop stop-color="#E0CD81"/> <stop offset="1" stop-color="#BB9F32"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-download_apk_android" viewBox="0 0 136 43"> <title>download_apk_android</title> <g clip-path="url(#a)"> <path d="M135.95 38.582c0 2.375-1.757 4.312-3.911 4.312H3.919c-2.155 0-3.912-1.937-3.912-4.312V4.207c0-2.375 1.757-4.313 3.912-4.313h128.176c2.155 0 3.912 1.938 3.912 4.313l-.057 34.375z" fill="#135"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M28.339 9.32l-.29.453c2.204 1.063 3.697 3.076 3.697 5.379H17.19c0-2.303 1.493-4.316 3.7-5.379l-.293-.454-.29-.447-.648-1.005a.275.275 0 01.072-.373.256.256 0 01.362.075l.695 1.078.292.452.296.46a8.307 8.307 0 013.092-.587c1.106 0 2.153.21 3.093.587l.297-.46.989-1.53a.251.251 0 01.359-.075c.12.082.153.248.072.373l-.647 1.005-.291.447zm-11.15 6.906h14.557v11.822c0 .939-.736 1.703-1.646 1.703h-1.19a1.6 1.6 0 01.066.447v3.404c0 .89-.7 1.61-1.563 1.61-.86 0-1.559-.72-1.559-1.61v-3.404c0-.157.022-.305.062-.447h-2.897c.04.142.063.29.063.447v3.404c0 .89-.7 1.61-1.56 1.61-.861 0-1.561-.72-1.561-1.61v-3.404c0-.157.022-.305.063-.447h-1.188c-.91 0-1.647-.764-1.647-1.703V16.226zm-2.6 0c-.863 0-1.561.722-1.561 1.611v6.897c0 .89.698 1.611 1.56 1.611.862 0 1.56-.721 1.56-1.61v-6.898c0-.89-.698-1.61-1.56-1.61zm18.198 1.611c0-.89.698-1.61 1.56-1.61.861 0 1.56.72 1.56 1.61v6.897c0 .89-.699 1.611-1.56 1.611-.862 0-1.56-.721-1.56-1.61v-6.898zm-12.705-4.835a.793.793 0 01-.78-.806c0-.446.349-.805.78-.805.431 0 .78.36.78.805a.793.793 0 01-.78.806zm5.46-.806c0 .445.348.806.78.806.43 0 .78-.36.78-.806a.792.792 0 00-.78-.805.792.792 0 00-.78.805z" fill="#A4C639"/> <path d="M44.486 13.772V8.236h1.77c.394 0 .736.067 1.026.202.292.133.525.323.699.572.174.25.301.538.383.868.083.327.124.7.124 1.116 0 .33-.024.633-.073.908-.05.274-.13.528-.243.763a2 2 0 01-.426.592c-.17.162-.38.29-.633.382a2.574 2.574 0 01-.857.133h-1.77zm.89-.82h.773c.476 0 .831-.155 1.067-.466.237-.31.357-.803.357-1.476 0-.3-.025-.565-.074-.795a1.963 1.963 0 00-.236-.613 1.068 1.068 0 00-.445-.41 1.462 1.462 0 00-.67-.141h-.772v3.902zm4.363-1.557v-.738c0-.784.189-1.402.566-1.854.378-.451.893-.677 1.546-.677.652 0 1.166.226 1.541.677.375.452.563 1.07.563 1.854v.738c0 .78-.189 1.389-.567 1.83-.375.438-.891.657-1.548.657-.655 0-1.17-.22-1.542-.657-.373-.438-.56-1.048-.56-1.83zm.898.004c0 .541.11.952.33 1.234.221.278.514.417.88.417.363 0 .655-.139.876-.418.22-.28.33-.692.33-1.233v-.75c0-.544-.111-.961-.334-1.253a1.041 1.041 0 00-.872-.438c-.363 0-.656.146-.88.438-.22.292-.33.71-.33 1.253v.75zm4.307-3.163h.978l.81 4.064h.033l.92-4.064h.805l.917 4.064h.036l.806-4.064h.979l-1.343 5.536h-.817L58.1 9.785h-.033l-.967 3.987h-.817l-1.339-5.536zm7.471 5.536V8.236h.77l2.306 3.873h.03V8.236h.845v5.536h-.761L63.29 9.886h-.026v3.886h-.85zm5.665 0V8.236h.89v4.693h2.186v.843H68.08zm3.98-2.377v-.738c0-.784.189-1.402.566-1.854.378-.451.893-.677 1.546-.677.652 0 1.166.226 1.541.677.376.452.563 1.07.563 1.854v.738c0 .78-.189 1.389-.567 1.83-.375.438-.89.657-1.548.657-.655 0-1.169-.22-1.542-.657-.373-.438-.559-1.048-.559-1.83zm.898.004c0 .541.11.952.33 1.234.222.278.515.417.88.417.363 0 .655-.139.876-.418.22-.28.33-.692.33-1.233v-.75c0-.544-.11-.961-.334-1.253a1.04 1.04 0 00-.872-.438c-.363 0-.656.146-.88.438-.22.292-.33.71-.33 1.253v.75zm4.256 2.373l1.714-5.536h1.012l1.71 5.536h-.952l-.427-1.492h-1.733l-.427 1.492h-.897zm1.519-2.239h1.346l-.654-2.304h-.033l-.66 2.304zm4.142 2.24V8.235h1.77c.394 0 .736.067 1.026.202.292.133.524.323.698.572.175.25.303.538.383.868.084.327.126.7.126 1.116 0 .33-.025.633-.074.908-.05.274-.13.528-.243.763-.113.233-.255.43-.427.592-.169.162-.38.29-.632.382a2.576 2.576 0 01-.858.133h-1.77zm.89-.82h.773c.476 0 .831-.156 1.067-.467.238-.31.357-.803.357-1.476 0-.3-.025-.565-.074-.795a1.97 1.97 0 00-.236-.613 1.068 1.068 0 00-.445-.41 1.461 1.461 0 00-.67-.141h-.772v3.902zm6.168.82l1.715-5.537h1.012l1.71 5.536h-.953l-.426-1.492h-1.733l-.426 1.492h-.899zm1.52-2.24H92.8l-.656-2.304h-.033l-.658 2.304zm4.142 2.24V8.235h1.957c.513 0 .919.169 1.217.507.3.338.449.772.449 1.302 0 .532-.15.965-.452 1.298-.3.332-.707.498-1.221.498h-1.06v1.931h-.89zm.89-2.718h.644c.397 0 .694-.073.89-.22.196-.148.294-.412.294-.79 0-.322-.08-.571-.238-.747-.16-.176-.383-.263-.67-.263h-.92v2.02zm4.069 2.717V8.236h.889v2.539h.041l1.987-2.54h.989l-1.814 2.378 1.899 3.16h-1.082l-1.471-2.5-.549.67v1.83h-.889zm6.996-2.616c0-.974.174-1.72.525-2.24.354-.521.83-.782 1.428-.782.242 0 .466.043.669.13a1.4 1.4 0 01.504.345c.131.14.234.294.309.462.076.168.121.338.133.511h-.85a.734.734 0 00-.239-.454.746.746 0 00-.548-.207c-.329 0-.591.179-.787.535-.194.357-.295.858-.302 1.501h.033a1.248 1.248 0 011.207-.807c.208 0 .407.04.596.122a1.596 1.596 0 01.875.916c.091.233.137.49.137.771 0 .395-.082.74-.243 1.034a1.637 1.637 0 01-.648.666 1.85 1.85 0 01-.902.219c-.588 0-1.051-.233-1.39-.698-.338-.465-.507-1.14-.507-2.024zm.952.848c0 .338.092.604.276.799.184.192.41.288.677.288a.874.874 0 00.662-.284c.179-.19.269-.457.269-.803 0-.344-.092-.611-.277-.803a.867.867 0 00-.662-.292.879.879 0 00-.673.296c-.181.197-.272.463-.272.799zm4.109 1.691a.568.568 0 01-.151-.41.56.56 0 01.148-.405.498.498 0 01.371-.154.5.5 0 01.379.158c.1.103.151.237.151.402a.572.572 0 01-.151.41.51.51 0 01-.379.153.496.496 0 01-.368-.154zm2.096-2.49v-.398c0-.82.165-1.47.493-1.955.329-.484.789-.726 1.38-.726.591 0 1.047.24 1.369.722.321.481.482 1.134.482 1.96v.397c0 .527-.07.99-.207 1.391-.137.397-.348.711-.632.941-.285.23-.627.345-1.027.345-.591 0-1.048-.24-1.372-.722-.324-.482-.486-1.133-.486-1.955zm.891-.008c0 .603.085 1.066.257 1.39.174.323.413.483.714.483s.539-.162.713-.486c.174-.325.261-.787.261-1.387v-.386c0-.6-.087-1.061-.261-1.383-.174-.324-.412-.487-.713-.487s-.54.163-.714.487c-.172.322-.257.783-.257 1.383v.386zm4.02.754v-.803h1.464V9.473h.736v1.675h1.472v.803h-1.472v1.744h-.736v-1.744h-1.464zM43.215 32.998l4.39-13.89h2.59l4.38 13.89h-2.44l-1.092-3.745h-4.437l-1.093 3.745h-2.298zm3.89-5.617h3.448l-1.677-5.78h-.085l-1.686 5.78zm8.86 5.617V22.232h2.185v1.516h.085c.188-.461.534-.858 1.036-1.19.502-.333 1.115-.5 1.837-.5 1.023 0 1.858.337 2.505 1.008.653.665.98 1.605.98 2.819v7.113H62.36v-6.36c0-1.669-.687-2.503-2.062-2.503-.66 0-1.178.22-1.555.661-.37.441-.555 1.079-.555 1.913v6.289h-2.223zm10.526-4.783v-1.22c0-1.5.333-2.694.999-3.583.665-.889 1.604-1.333 2.816-1.333.741 0 1.36.16 1.856.478.496.312.832.72 1.008 1.222h.084v-5.404h2.224v14.623h-2.176V31.35h-.085c-.139.502-.468.925-.99 1.271-.52.346-1.161.52-1.921.52-1.206 0-2.145-.441-2.816-1.323-.666-.89-.999-2.09-.999-3.603zm2.27-.244c0 1.004.192 1.794.575 2.371.383.57.942.855 1.677.855.697 0 1.243-.278 1.639-.835.401-.563.602-1.353.602-2.37v-.805c0-.976-.204-1.746-.612-2.31-.402-.563-.958-.844-1.667-.844-.722 0-1.272.288-1.649.865-.376.576-.565 1.36-.565 2.35v.723zm9.264 5.027V22.232h2.224v1.394h.084c.377-1.038 1.165-1.557 2.365-1.557.257 0 .502.024.735.071v2.107c-.158-.055-.465-.082-.924-.082-1.482 0-2.223.835-2.223 2.503v6.33h-2.26zm6.213-5.017v-.763c0-1.004.16-1.89.48-2.656a4.06 4.06 0 011.516-1.832c.685-.454 1.515-.681 2.488-.681 1.457 0 2.565.468 3.325 1.404.766.93 1.15 2.18 1.15 3.755v.773c0 1.615-.38 2.887-1.14 3.816-.76.923-1.872 1.384-3.335 1.384-1.463 0-2.578-.461-3.344-1.384-.76-.922-1.14-2.194-1.14-3.816zm2.232-.06c0 .46.038.881.113 1.261.076.38.195.733.359 1.058.163.32.395.57.697.753.3.183.662.275 1.083.275.414 0 .772-.088 1.073-.265.302-.183.53-.437.688-.763.163-.325.28-.678.349-1.058.075-.38.113-.8.113-1.262v-.62c0-.469-.038-.893-.113-1.273a3.915 3.915 0 00-.35-1.058 1.761 1.761 0 00-.696-.753c-.296-.183-.65-.275-1.064-.275-.415 0-.775.092-1.083.275a1.828 1.828 0 00-.697.763 3.976 3.976 0 00-.359 1.059c-.075.38-.113.8-.113 1.261v.621zm8.992-7.43a1.253 1.253 0 01-.368-.925c0-.373.123-.679.368-.916.25-.244.568-.367.95-.367.402 0 .726.123.971.367.251.237.377.543.377.916s-.123.681-.368.926c-.245.237-.57.356-.98.356-.382 0-.7-.119-.95-.356zm-.142 12.507V22.232h2.224v10.766H95.32zm4.366-4.783v-1.22c0-1.5.333-2.694.998-3.583.666-.889 1.605-1.333 2.817-1.333.742 0 1.36.16 1.856.478.496.312.832.72 1.008 1.222h.084v-5.404h2.224v14.623h-2.176V31.35h-.085c-.138.502-.468.925-.989 1.271-.521.346-1.162.52-1.922.52-1.205 0-2.144-.441-2.817-1.323-.665-.89-.998-2.09-.998-3.603zm2.27-.244c0 1.004.192 1.794.576 2.371.382.57.941.855 1.676.855.697 0 1.243-.278 1.639-.835.402-.563.602-1.353.602-2.37v-.805c0-.976-.203-1.746-.612-2.31-.402-.563-.957-.844-1.666-.844-.723 0-1.272.288-1.65.865-.376.576-.565 1.36-.565 2.35v.723z" fill="#fff"/> <defs> <clipPath> <path fill="#fff" d="M0 0h136v43H0z"/> </clipPath> </defs> </g> </symbol> <symbol fill="none" id="sprite-eth" viewBox="0 0 60 60"> <title>eth</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M29.996 50.976L16.886 32.83l13.11 7.607v.002l13.116-7.609-13.116 18.146zm0-25.594l13.107 5.853-13.107 7.61-13.11-7.61 13.11-5.853zm0-16.357l13.107 21.364-13.107-5.857-13.11 5.857 13.11-21.364zM30 0C13.431 0 0 13.431 0 30c0 16.569 13.431 30 30 30 16.569 0 30-13.431 30-30C60 13.431 46.569 0 30 0z" fill="url(#painepll_linear)"/> <defs> <linearGradient id="painepll_linear" x1="30" y1="0" x2="30" y2="60" gradientUnits="userSpaceOnUse"> <stop stop-color="#1FA4ED"/> <stop offset="1" stop-color="#5F83E7"/> </linearGradient> </defs> </symbol> <symbol class="svg-icon" id="sprite-facebook-header" viewBox="0 0 8 16"> <title>facebook-header</title> <path d="M5.046 16V7.999h2.245l.298-2.757H5.046l.004-1.38c0-.72.07-1.105 1.12-1.105h1.403V0H5.327C2.63 0 1.681 1.337 1.681 3.587v1.655H0V8h1.681v8h3.365z" fill="var(--header-icons-bg)"/> </symbol> <symbol fill="none" id="sprite-facebook" viewBox="0 0 31 31"> <title>facebook</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.368.229C6.88.229 0 6.997 0 15.347c0 8.35 6.88 15.119 15.368 15.119 8.487 0 15.367-6.769 15.367-15.119S23.855.23 15.368.23zm1.09 15.278v8.226h-3.46v-8.225H11.27v-2.835h1.728v-1.701c0-2.313.976-3.688 3.748-3.688h2.309v2.835h-1.443c-1.08 0-1.151.396-1.151 1.135l-.004 1.419h2.614l-.306 2.834h-2.308z" fill="#fff"/> </symbol> <symbol fill="none" id="sprite-fedora" viewBox="0 0 86 86"> <title>fedora</title> <rect width="86" height="86" rx="6" fill="#1CAFD7"/> <path d="M67.86 42.93C67.86 29.163 56.698 18 42.93 18 29.166 18 18.01 29.153 18 42.913v19.293a5.667 5.667 0 005.668 5.653H42.94c13.764-.005 24.92-11.163 24.92-24.928z" fill="#233366"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M44.07 41.805H32.373c-6.456 0-11.694 5.238-11.694 11.695 0 6.456 5.238 11.694 11.694 11.694 6.457 0 11.695-5.238 11.695-11.694V41.805zM26.15 53.5a6.228 6.228 0 016.224-6.225H38.6V53.5a6.228 6.228 0 01-6.224 6.224A6.228 6.228 0 0126.15 53.5z" fill="#46547E"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M38.55 47.292h11.695c6.456 0 11.695-5.239 11.695-11.695S56.7 23.903 50.245 23.903 38.55 29.14 38.55 35.597v11.695zm11.695-5.47H44.02v-6.225a6.228 6.228 0 016.225-6.224 6.228 6.228 0 016.224 6.224 6.228 6.228 0 01-6.224 6.225z" fill="#46547E"/> <path d="M44.07 41.812v11.675c0 6.462-5.24 11.7-11.701 11.7-.98 0-1.678-.11-2.585-.347-1.323-.347-2.405-1.431-2.405-2.693 0-1.526 1.107-2.635 2.762-2.635.788 0 1.074.151 2.228.151 3.406 0 6.17-2.76 6.176-6.166v-5.366a.871.871 0 00-.873-.87l-4.057-.002a2.718 2.718 0 01-2.733-2.721c0-1.525 1.234-2.726 2.762-2.726" fill="#fff"/> <path d="M38.55 47.286V35.61c0-6.462 5.239-11.7 11.7-11.7.98 0 1.678.11 2.585.347 1.323.346 2.405 1.431 2.405 2.693 0 1.526-1.107 2.635-2.762 2.635-.788 0-1.074-.151-2.227-.151a6.177 6.177 0 00-6.176 6.166v5.366c0 .481.39.87.872.87l4.057.002a2.718 2.718 0 012.733 2.72c0 1.526-1.234 2.727-2.762 2.727" fill="#fff"/> </symbol> <symbol fill="none" id="sprite-footer-logo-atomic" viewBox="0 0 116 48"> <title>footer-logo-atomic</title> <path d="M60.601 16.273h-5.24l-.997 2.992h-3.178l5.4-14.52h2.77l5.43 14.52h-3.178L60.6 16.273zm-4.434-2.423h3.627l-1.823-5.435-1.804 5.435zM69.22 5.822v2.653h1.843v2.114H69.22v5.385c0 .4.076.685.23.858.152.173.444.259.876.259.319 0 .601-.023.847-.07v2.184a5.924 5.924 0 01-1.744.26c-2.02 0-3.049-1.02-3.089-3.062v-5.814h-1.574V8.475h1.574V5.822h2.88zm2.7 7.948c0-1.07.206-2.024.618-2.862a4.534 4.534 0 011.773-1.945c.778-.458 1.678-.688 2.7-.688 1.455 0 2.641.446 3.558 1.337.923.89 1.438 2.1 1.544 3.63l.02.737c0 1.656-.462 2.986-1.385 3.99-.923.997-2.162 1.496-3.716 1.496-1.555 0-2.797-.499-3.727-1.496-.923-.998-1.385-2.354-1.385-4.07v-.129zm2.88.21c0 1.024.192 1.808.578 2.353.385.539.936.808 1.654.808.697 0 1.242-.266 1.634-.798.392-.538.588-1.396.588-2.573 0-1.004-.196-1.782-.588-2.333-.392-.552-.944-.828-1.654-.828-.704 0-1.25.276-1.634.828-.386.545-.578 1.392-.578 2.543zm11.807-5.505l.09 1.206c.763-.937 1.796-1.406 3.098-1.406 1.388 0 2.342.549 2.86 1.646.757-1.097 1.837-1.646 3.238-1.646 1.17 0 2.04.343 2.61 1.027.572.678.858 1.702.858 3.072v6.891h-2.89v-6.881c0-.612-.12-1.057-.359-1.336-.239-.286-.66-.43-1.265-.43-.864 0-1.462.413-1.794 1.237l.01 7.41h-2.88v-6.871c0-.625-.122-1.077-.368-1.356-.246-.28-.664-.42-1.255-.42-.817 0-1.409.34-1.774 1.018v7.63h-2.88V8.474h2.7zm18.014 10.79h-2.889V8.475h2.889v10.79zm-3.059-13.583c0-.432.143-.788.429-1.067.292-.28.687-.419 1.186-.419.491 0 .883.14 1.175.42.293.278.439.634.439 1.066 0 .44-.15.798-.449 1.077-.292.28-.68.42-1.165.42s-.877-.14-1.176-.42c-.292-.279-.439-.638-.439-1.077zm9.924 11.459c.532 0 .964-.146 1.296-.439.332-.292.505-.681.518-1.167h2.7a3.727 3.727 0 01-.598 2.015 3.988 3.988 0 01-1.614 1.416c-.678.332-1.428.499-2.252.499-1.541 0-2.757-.49-3.647-1.466-.89-.984-1.335-2.34-1.335-4.07v-.189c0-1.662.442-2.988 1.325-3.979.884-.99 2.096-1.486 3.637-1.486 1.349 0 2.428.386 3.238 1.157.818.765 1.233 1.785 1.246 3.062h-2.7c-.013-.559-.186-1.011-.518-1.357-.332-.352-.771-.528-1.315-.528-.671 0-1.18.246-1.525.738-.339.485-.508 1.276-.508 2.373v.3c0 1.11.169 1.908.508 2.393.339.485.854.728 1.544.728zM67.805 38.932L69.758 28.6h2.98l-3.219 14.52h-3.01l-2.36-9.713-2.362 9.714h-3.009L55.56 28.6h2.979l1.963 10.311 2.39-10.312h2.532l2.381 10.332zm12.275 4.189a3.202 3.202 0 01-.288-.968c-.698.778-1.605 1.167-2.72 1.167-1.057 0-1.934-.306-2.631-.917-.69-.612-1.036-1.383-1.036-2.314 0-1.143.422-2.021 1.265-2.633.85-.611 2.076-.92 3.677-.927h1.325v-.619c0-.498-.13-.897-.389-1.196-.252-.3-.654-.45-1.205-.45-.485 0-.867.117-1.146.35-.273.233-.409.552-.409.957h-2.88a2.9 2.9 0 01.579-1.735c.385-.532.93-.947 1.634-1.247.704-.305 1.494-.458 2.371-.458 1.329 0 2.382.335 3.159 1.007.784.665 1.176 1.602 1.176 2.812v4.677c.006 1.024.149 1.799.428 2.324v.17h-2.91zm-2.38-2.005c.424 0 .816-.093 1.175-.28a1.89 1.89 0 00.797-.767v-1.855h-1.076c-1.442 0-2.209.499-2.302 1.496l-.01.17c0 .359.126.654.379.887.252.233.598.35 1.036.35zm10.112 2.005h-2.89V27.802h2.89v15.319zm5.42 0h-2.889V27.802h2.89v15.319zm7.344.2c-1.58 0-2.87-.486-3.866-1.457-.99-.97-1.485-2.264-1.485-3.88v-.279c0-1.083.21-2.05.628-2.902.419-.857 1.01-1.515 1.774-1.974.77-.466 1.647-.698 2.63-.698 1.475 0 2.634.465 3.477 1.396.851.93 1.276 2.25 1.276 3.959v1.177h-6.865c.093.705.372 1.27.837 1.695.471.426 1.066.639 1.783.639 1.11 0 1.976-.403 2.601-1.207l1.415 1.586c-.432.611-1.017 1.09-1.754 1.436-.737.339-1.554.508-2.451.508zm-.329-8.857c-.571 0-1.036.193-1.395.579-.352.385-.578.937-.677 1.655h4.005v-.23c-.013-.638-.186-1.13-.518-1.475-.332-.352-.804-.529-1.415-.529zm9.854-4.787v2.653h1.844v2.114h-1.844v5.386c0 .399.077.684.23.857.152.173.445.26.876.26.319 0 .602-.024.847-.07v2.184a5.917 5.917 0 01-1.743.26c-2.02 0-3.049-1.021-3.089-3.063v-5.814h-1.574V32.33h1.574v-2.653h2.879z" fill="#F5F9FB"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 48L14.532 8.3c1.844-4.634 5.282-7.258 9.853-7.333V.965h.204v.002c4.57.075 8.008 2.699 9.852 7.334L48.974 48l-9-3.12-12.413-33.913c-.756-1.876-1.628-2.551-3.074-2.58-1.446.029-2.318.704-3.074 2.58L9 44.879 0 48zm30.81-15.117c0 3.468-2.793 6.279-6.238 6.279-3.445 0-6.238-2.811-6.238-6.279s2.793-6.279 6.238-6.279c3.445 0 6.238 2.812 6.238 6.28z" fill="#3692FE"/> </symbol> <symbol fill="none" id="sprite-github-footer" viewBox="0 0 32 31"> <title>github-footer</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.537.229C6.957.229 0 7.245 0 15.9c0 6.924 4.452 12.8 10.625 14.872.777.145 1.062-.34 1.062-.754 0-.374-.014-1.609-.021-2.918-4.323.948-5.235-1.85-5.235-1.85-.707-1.81-1.725-2.293-1.725-2.293-1.41-.972.106-.952.106-.952 1.56.11 2.382 1.615 2.382 1.615 1.386 2.396 3.635 1.703 4.521 1.303.14-1.013.543-1.705.987-2.096-3.451-.396-7.079-1.74-7.079-7.746 0-1.71.607-3.109 1.6-4.206-.16-.395-.692-1.99.151-4.148 0 0 1.305-.421 4.274 1.607a14.772 14.772 0 013.89-.528c1.32.006 2.65.18 3.892.527 2.965-2.027 4.268-1.606 4.268-1.606.846 2.159.314 3.753.152 4.148.996 1.097 1.6 2.495 1.6 4.206 0 6.02-3.636 7.345-7.095 7.733.557.487 1.054 1.44 1.054 2.903 0 2.096-.018 3.784-.018 4.3 0 .418.28.906 1.067.752 6.17-2.074 10.616-7.947 10.616-14.87C31.074 7.246 24.118.23 15.537.23z" fill="#fff"/> </symbol> <symbol fill="none" id="sprite-google-play--mobile" viewBox="0 0 136 43"> <title>google-play--mobile</title> <defs> <linearGradient id="a" x1="17.284" y1="6.984" x2="23.232" y2="31.412" gradientUnits="userSpaceOnUse"> <stop stop-color="#006884"/> <stop offset="1" stop-color="#8AD1D0"/> </linearGradient> <linearGradient id="b" x1="10.028" y1="10.459" x2="26.238" y2="19.222" gradientUnits="userSpaceOnUse"> <stop stop-color="#24BBB6"/> <stop offset="1" stop-color="#DBE692"/> </linearGradient> <linearGradient id="c" x1="28.681" y1="25.097" x2="28.681" y2="16.651" gradientUnits="userSpaceOnUse"> <stop stop-color="#FCC072"/> <stop offset="1" stop-color="#F58A5B"/> </linearGradient> <linearGradient id="d" x1="13.17" y1="35.348" x2="25.975" y2="22.316" gradientUnits="userSpaceOnUse"> <stop stop-color="#712B8F"/> <stop offset="1" stop-color="#EA1D27"/> </linearGradient> </defs> <path d="M131.75 42.5H4.25A4.262 4.262 0 010 38.25v-34A4.262 4.262 0 014.25 0h127.5A4.263 4.263 0 01136 4.25v34a4.263 4.263 0 01-4.25 4.25z" fill="#135"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.412 20.825V9.669c0-.638.531-1.169 1.063-1.169.53 0 .743.106 1.062.319L33.043 20.08c.425.213.638.532.638.85 0 .319-.213.638-.638.85L12.537 33.044c-.212.106-.531.319-1.062.319-.532 0-1.063-.532-1.063-1.17V20.826z" fill="url(#a)"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M23.691 20.931L11.26 8.5h.212c.532 0 .744.106 1.063.319l15.087 8.287-3.931 3.825z" fill="url(#b)"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M27.518 24.65l-3.825-3.825 3.932-3.931 5.418 2.975c.425.212.638.531.638.85 0 .319-.213.637-.638.85l-5.525 3.081z" fill="url(#c)"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.37 33.15l12.324-12.325 3.825 3.825-14.981 8.181c-.319.212-.531.319-1.169.319.106 0 .106 0 0 0z" fill="url(#d)"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M75.544 36.019c-.531-.425-.956-1.169-1.169-1.594l1.7-.744c.106.213.319.532.531.85.425.425 1.063.85 1.7.85.638 0 1.382-.319 1.806-.85.32-.531.532-1.062.532-1.806v-.638c-1.275 1.594-3.931 1.382-5.419-.318-1.594-1.7-1.594-4.569 0-6.269 1.594-1.594 3.931-1.806 5.313-.319v-.744h1.806v7.97c0 2.018-.744 3.187-1.7 3.93-.638.532-1.594.744-2.444.744-.956-.106-1.913-.425-2.656-1.062zm44.519.425l1.806-4.25-3.188-7.332h1.807l2.231 5.207 2.231-5.206h1.806l-4.887 11.58h-1.806zm-8.607-4.038c-.531-.531-.743-1.275-.743-2.018 0-.638.212-1.276.637-1.7.744-.744 1.806-1.063 2.975-1.063.744 0 1.381.106 1.913.425 0-1.275-1.063-1.806-1.913-1.806-.744 0-1.487.425-1.806 1.169l-1.594-.638c.319-.744 1.169-2.125 3.294-2.125 1.062 0 2.125.319 2.762 1.063.638.743.85 1.593.85 2.762v4.462h-1.806v-.743c-.212.319-.637.531-.956.743-.425.213-.956.32-1.488.32-.637-.107-1.593-.32-2.125-.85zm-56.631-3.825c0-2.125 1.594-4.462 4.462-4.462 2.763 0 4.463 2.337 4.463 4.462 0 2.125-1.594 4.463-4.462 4.463-2.87 0-4.463-2.338-4.463-4.463zm9.563 0c0-2.125 1.593-4.462 4.462-4.462 2.763 0 4.463 2.337 4.463 4.462 0 2.125-1.594 4.463-4.463 4.463-2.762 0-4.462-2.338-4.462-4.463zm-21.57 2.338c-2.655-2.657-2.55-7.013.107-9.775 1.381-1.381 3.081-2.019 4.888-2.019 1.7 0 3.4.637 4.674 1.913l-1.275 1.38c-1.912-1.912-4.993-1.805-6.8.107a5.134 5.134 0 000 7.119c1.913 2.019 5.1 2.125 7.013.106.638-.637.85-1.488.956-2.337H47.92V25.5h6.269c.106.425.106.956.106 1.488 0 1.593-.638 3.187-1.7 4.25-1.169 1.168-2.869 1.806-4.569 1.806-1.913-.106-3.825-.744-5.206-2.125zm44.945.744c-1.594-1.7-1.594-4.57 0-6.375 1.593-1.7 4.25-1.7 5.737 0 .531.53.85 1.274 1.169 2.018l-5.844 2.444a2.267 2.267 0 002.125 1.381c.956 0 1.594-.319 2.231-1.275l1.594 1.063c-.213.212-.425.425-.531.637-1.806 1.806-4.888 1.806-6.481.107zm11.05 1.274V21.145h3.825c2.231 0 4.037 1.594 4.037 3.506 0 1.913-1.594 3.506-3.612 3.506h-2.338v4.675h-1.912v.106zm8.925 0V21.145h1.806v11.794h-1.806zm-24.013-.212V19.55h1.913v13.175h-1.913zm32.406-3.294c-.425-.319-1.062-.425-1.7-.425-1.275 0-2.018.638-2.018 1.381 0 .744.743 1.17 1.487 1.17 1.063 0 2.231-.85 2.231-2.126zm-54.4-.85c0-1.275-.85-2.656-2.444-2.656-1.593 0-2.443 1.381-2.443 2.656 0 1.275.85 2.657 2.444 2.657 1.487 0 2.443-1.382 2.443-2.657zm9.563 0c0-1.275-.85-2.656-2.444-2.656-1.594 0-2.444 1.381-2.444 2.656 0 1.275.85 2.657 2.444 2.657 1.594 0 2.444-1.382 2.444-2.657zm9.456.744c0-.106 0-.212.106-.319v-.956c0-.106-.106-.319-.106-.425-.319-1.063-1.275-1.806-2.231-1.806-1.275 0-2.338 1.275-2.338 2.656 0 1.487 1.063 2.656 2.444 2.656.85.107 1.7-.637 2.125-1.806zm7.756-.956l3.931-1.7c-.424-.744-1.062-.957-1.593-.957-1.594.107-2.55 1.807-2.338 2.657zm16.257-3.613c0-1.062-.85-1.806-2.019-1.806h-2.125v3.719h2.231c1.063 0 1.913-.85 1.913-1.913z" fill="#fff"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M121.442 34.316h-.104v-.104h.104-.104v.104h.104zm.216 0c0-.104 0-.104 0 0-.104-.104-.104-.104 0 0-.104 0-.104 0 0 0zm0-.104c0 .104 0 .104 0 0 0 .104-.104.104 0 0-.104 0 0 0 0 0z" fill="#fff"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M121.76 34.212h-.104.104v.104-.104z" fill="#fff"/> <path d="M41.334 10.731c0-1.912 1.381-3.081 3.081-3.081 1.169 0 1.913.531 2.444 1.275l-.85.531c-.319-.425-.85-.743-1.594-.743-1.169 0-2.018.85-2.018 2.125s.85 2.125 2.018 2.125c.638 0 1.169-.32 1.382-.532v-.956h-1.7v-.956h2.868v2.231c-.531.637-1.381 1.063-2.444 1.063-1.806 0-3.187-1.276-3.187-3.082zm6.906 2.975v-5.95h4.038v.956h-3.081V10.2h2.974v.956h-2.974v1.7h3.08v.957l-4.037-.107zm7.01 0V8.712h-1.807v-.956h4.675v.956h-1.806v4.994H55.25zm6.478 0v-5.95h1.063v5.95h-1.063zm3.932 0V8.712h-1.806v-.956h4.674v.956h-1.806v4.994H65.66zm6.272-2.975c0-1.806 1.275-3.081 3.08-3.081 1.807 0 3.082 1.275 3.082 3.081s-1.275 3.082-3.081 3.082-3.081-1.382-3.081-3.082zm4.993 0c0-1.275-.743-2.125-2.018-2.125-1.17 0-2.02.957-2.02 2.125 0 1.275.745 2.125 2.02 2.125s2.018-.956 2.018-2.125zm6.478 2.975l-3.08-4.25v4.25H79.26v-5.95h1.062l3.081 4.144V7.756h1.063v5.95h-1.063z" fill="#fff"/> </symbol> <symbol fill="none" id="sprite-linkedin-blue" viewBox="0 0 36 36"> <title>linkedin-blue</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.392 35.017c9.548 0 17.289-7.615 17.289-17.008C34.68 8.615 26.94 1 17.392 1 7.844 1 .104 8.615.104 18.009c0 9.393 7.74 17.008 17.288 17.008z" fill="#3692FE"/> <path d="M13.32 11.667c0 .92-.74 1.666-1.653 1.666a1.66 1.66 0 01-1.654-1.666c0-.92.74-1.667 1.654-1.667a1.66 1.66 0 011.653 1.667zm.013 3H10v10.666h3.333V14.667zm5.322 0h-3.312v10.666h3.312v-5.599c0-3.113 4.02-3.368 4.02 0v5.6H26v-6.755c0-5.253-5.948-5.062-7.345-2.476v-1.436z" fill="#fff"/> </symbol> <symbol fill="none" id="sprite-logo" viewBox="0 0 79 32"> <title>logo</title> <path d="M41.156 10.397h-3.559l-.677 2.031h-2.158l3.667-9.86h1.882l3.688 9.86h-2.16l-.683-2.031zm-3.01-1.646h2.462L39.37 5.06l-1.225 3.69zm8.864-5.452V5.1h1.252v1.436H47.01v3.657c0 .271.052.466.155.583.104.117.303.176.596.176.216 0 .408-.016.575-.047v1.483a4.022 4.022 0 01-1.184.176c-1.372 0-2.07-.693-2.098-2.08V6.537h-1.07V5.1h1.07V3.3h1.956zm1.834 5.398c0-.727.14-1.375.419-1.944a3.08 3.08 0 011.205-1.32c.527-.313 1.139-.468 1.833-.468.988 0 1.794.302 2.416.907.627.605.977 1.427 1.049 2.466l.014.5c0 1.125-.314 2.028-.941 2.71-.627.677-1.468 1.016-2.524 1.016s-1.9-.339-2.53-1.016c-.628-.677-.941-1.598-.941-2.763v-.088zm1.955.142c0 .695.13 1.228.393 1.598.261.366.636.549 1.123.549.474 0 .843-.18 1.11-.542.266-.366.399-.948.399-1.747 0-.682-.133-1.21-.4-1.585-.266-.375-.64-.562-1.123-.562-.478 0-.848.187-1.11.562-.261.37-.392.946-.392 1.727zM58.818 5.1l.06.82c.52-.637 1.221-.955 2.105-.955.943 0 1.59.372 1.942 1.117.515-.745 1.248-1.117 2.2-1.117.793 0 1.385.232 1.772.697.388.46.582 1.156.582 2.086v4.68h-1.962V7.755c0-.415-.081-.718-.244-.907-.162-.195-.448-.292-.859-.292-.587 0-.992.28-1.218.84l.007 5.032h-1.956V7.762c0-.424-.083-.732-.25-.921-.167-.19-.451-.285-.853-.285-.555 0-.956.23-1.204.691v5.181h-1.956V5.1h1.834zm12.234 7.329H69.09V5.1h1.962v7.329zm-2.077-9.225a.97.97 0 01.29-.725c.2-.19.468-.284.806-.284.334 0 .6.094.799.284a.96.96 0 01.297.725.956.956 0 01-.304.731c-.199.19-.463.285-.792.285-.33 0-.595-.095-.798-.285a.967.967 0 01-.298-.731zm6.74 7.782c.36 0 .654-.1.88-.298.225-.199.342-.463.351-.793h1.834a2.53 2.53 0 01-.406 1.369c-.266.41-.631.731-1.096.961-.46.226-.97.339-1.53.339-1.046 0-1.872-.332-2.476-.996-.605-.668-.907-1.589-.907-2.763v-.129c0-1.129.3-2.03.9-2.702.6-.673 1.423-1.01 2.47-1.01.916 0 1.649.263 2.2.786.554.52.836 1.213.845 2.08h-1.834c-.009-.38-.126-.687-.352-.921-.225-.24-.523-.36-.893-.36-.455 0-.8.168-1.035.502-.23.33-.345.867-.345 1.612v.203c0 .754.115 1.296.345 1.626.23.329.58.494 1.049.494zm-29.666 14.8l1.326-7.018h2.023l-2.185 9.862h-2.044l-1.604-6.597-1.603 6.597h-2.044l-2.186-9.861h2.024l1.333 7.003 1.624-7.003h1.718l1.618 7.016zm8.337 2.844a2.173 2.173 0 01-.197-.657c-.473.528-1.09.792-1.847.792-.717 0-1.313-.207-1.786-.623a2.009 2.009 0 01-.704-1.571c0-.777.286-1.373.86-1.788.577-.416 1.409-.626 2.496-.63h.9v-.42c0-.339-.088-.61-.264-.813-.171-.203-.444-.305-.819-.305-.329 0-.588.08-.778.238-.185.157-.277.374-.277.65h-1.956c0-.425.131-.818.393-1.179.261-.361.631-.643 1.11-.846a4.003 4.003 0 011.61-.312c.902 0 1.617.228 2.145.684.532.452.799 1.088.799 1.91v3.177c.004.695.101 1.221.29 1.578v.115h-1.975zm-1.618-1.361c.29 0 .555-.064.799-.19.243-.131.424-.305.541-.522v-1.26h-.73c-.98 0-1.5.34-1.564 1.017l-.007.115c0 .244.086.445.258.603.171.157.406.236.703.236zm6.869 1.36h-1.963V18.228h1.963V28.63zm3.68 0h-1.962V18.228h1.963V28.63zm4.988.136c-1.074 0-1.949-.33-2.626-.989-.672-.659-1.008-1.537-1.008-2.634v-.19c0-.736.142-1.393.426-1.97a3.112 3.112 0 011.205-1.342c.523-.316 1.119-.474 1.786-.474 1.002 0 1.79.316 2.362.948.578.632.866 1.529.866 2.69v.798h-4.662c.063.479.252.863.568 1.152.32.289.724.433 1.212.433.753 0 1.342-.273 1.766-.82l.96 1.078c-.293.415-.69.74-1.19.975a3.944 3.944 0 01-1.665.345zm-.223-6.014c-.388 0-.704.13-.948.393-.239.262-.392.636-.46 1.124h2.72v-.156c-.009-.433-.126-.767-.351-1.002-.226-.24-.546-.36-.961-.36zm6.692-3.251v1.802h1.252v1.435h-1.252v3.658c0 .27.052.465.156.582.103.118.302.176.595.176.217 0 .408-.015.575-.047v1.483a4.023 4.023 0 01-1.184.176c-1.371 0-2.07-.693-2.097-2.079v-3.949h-1.07v-1.435h1.07V19.5h1.955z" fill="#E4E7EC"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 31.943l9.87-26.96C11.122 1.834 13.457.052 16.56 0h.14v.001c3.104.052 5.438 1.833 6.69 4.981l9.87 26.961-6.111-2.119-8.431-23.031c-.514-1.274-1.106-1.733-2.088-1.753-.982.02-1.574.479-2.087 1.753L6.112 29.824 0 31.944zm20.925-10.266c0 2.355-1.897 4.264-4.237 4.264s-4.236-1.909-4.236-4.264c0-2.355 1.896-4.264 4.236-4.264s4.237 1.91 4.237 4.264z" fill="#3692FE"/> </symbol> <symbol fill="none" id="sprite-ltc" viewBox="0 0 100 100"> <title>ltc</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 50C0 22.386 22.386 0 50 0s50 22.386 50 50c0 27.615-22.386 50-50 50S0 77.615 0 50zm28.889 12.56l4.757-1.847-3.917 15.953h42.917l2.91-11.903h-25.74l2.826-11.61L57.4 51.25l2.267-9.167-4.7 1.903 5.063-20.653H42.932L35.996 51.43l-4.814 1.933-2.293 9.197z" fill="url(#paier_linear)"/> <defs> <linearGradient id="paier_linear" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse"> <stop stop-color="#ABAAFF"/> <stop offset="1" stop-color="#6765FF"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-bch" viewBox="0 0 65 65"> <title>bch</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M28.2014 22.7753C30.8071 21.9528 36.1428 20.2688 37.2827 24.243C38.396 28.129 32.7783 29.6404 30.2031 30.3332C29.969 30.3961 29.7603 30.4523 29.5837 30.5029L27.4355 23.0109C27.6497 22.9494 27.9082 22.8678 28.2014 22.7753ZM33.0359 42.5449L30.6682 34.2841C30.9238 34.2109 31.2324 34.1145 31.5818 34.0053C34.7087 33.0283 41.1169 31.0258 42.3701 35.397C43.5977 39.6715 36.8552 41.5037 33.7708 42.3419C33.4934 42.4173 33.2456 42.4846 33.0359 42.5449ZM40.9824 45.1174L42.7658 51.3414L39.0136 52.4178L37.2546 46.2769C36.2825 46.5565 35.2842 46.8338 34.2489 47.1077L36.0178 53.2764L32.2695 54.3508L30.4802 48.1166C29.6006 48.3627 28.7021 48.6035 27.7932 48.8633L22.91 50.2634L22.3706 45.5684C22.3706 45.5684 25.1588 44.816 25.0985 44.7871C26.1598 44.4807 26.2224 43.6376 26.1519 43.1401L23.3317 33.3015C23.4691 33.2612 23.603 33.2234 23.728 33.1875C23.5671 33.2106 23.429 33.2457 23.3239 33.2751L21.3099 26.2524C20.9477 25.5322 20.1999 24.7918 18.68 25.2271C18.7115 25.1629 15.9555 26.0103 15.9555 26.0103L14.8054 22.0031L19.9813 20.5209L19.9874 20.5398C20.765 20.3162 21.5586 20.0725 22.3662 19.8229L20.6004 13.6597L24.3508 12.5844L26.0827 18.6265C27.0787 18.319 28.0815 18.0105 29.068 17.7275L27.3465 11.7255L31.0987 10.6493L32.8666 16.8138C37.8318 15.8493 42.0953 16.239 43.7968 20.5607C45.0476 23.7214 44.2471 26.0632 42.3894 27.7949C46.2168 27.6279 49.071 29.113 49.9962 34.01C51.1466 40.0911 47.1871 42.9464 40.9824 45.1174ZM32.5001 0C14.5506 0 0 14.5506 0 32.5C0 50.4492 14.5506 65 32.5001 65C50.4494 65 65 50.4492 65 32.5C65 14.5506 50.4494 0 32.5001 0Z" fill="url(#paint112_linear)"></path> <defs> <linearGradient id="paint112_linear" x1="0" y1="0" x2="0" y2="65" gradientUnits="userSpaceOnUse"> <stop stop-color="#FFB862"></stop> <stop offset="1" stop-color="#F7931A"></stop> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-trx" viewBox="0 0 65 65"> <title>trx</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 0C14.5506 0 0 14.5508 0 32.5C0 50.4492 14.5506 65 32.5 65C50.4492 65 65 50.4492 65 32.5C65 14.5508 50.4492 0 32.5 0ZM47.9774 25.7425C46.4993 24.6936 44.9176 23.5744 43.371 22.4644C43.3359 22.4385 43.3026 22.4126 43.26 22.3867C43.0788 22.2379 42.8736 22.1209 42.6532 22.0408L42.6347 22.0316C38.4982 21.0178 34.2915 19.9781 30.2234 18.9717L19.1533 16.2394L18.8629 16.1617C18.5299 16.0673 18.1451 15.9619 17.7344 16.0137C17.6219 16.0309 17.5146 16.0726 17.4199 16.1358L17.3163 16.2227C17.1866 16.3557 17.0875 16.5155 17.0259 16.6908L17 16.7611V17.1588L17.0185 17.2198C19.3494 23.8519 21.7433 30.5802 24.052 37.0901C25.8298 42.1035 27.6779 47.2944 29.4797 52.3929C29.5907 52.7388 29.9071 52.9664 30.3011 52.9997H30.3862C30.7369 53.0087 31.0646 52.8257 31.2409 52.5224L38.0117 42.5086C39.66 40.0722 41.3102 37.6285 42.9603 35.1921L44.986 32.1915C46.096 30.545 47.243 28.8449 48.3807 27.1892L48.4399 27.1041V26.9987C48.4658 26.6953 48.4732 26.0718 47.9774 25.7407M40.0448 29.3925C38.4538 30.2324 36.8314 31.1 35.1979 31.9584L38.0543 28.8542C39.2419 27.5536 40.4814 26.2087 41.695 24.8916L41.7209 24.8657C41.8226 24.7269 41.9521 24.5974 42.089 24.4587C42.1815 24.3643 42.2851 24.2681 42.3794 24.1553C43.0121 24.5993 43.6522 25.0488 44.2682 25.491C44.7122 25.811 45.1655 26.1329 45.6279 26.4529C43.7604 27.4204 41.8993 28.4003 40.0448 29.3925ZM35.9601 28.9763C34.7373 30.3193 33.4719 31.6975 32.2158 33.0591C29.778 30.0594 27.333 27.0656 24.8808 24.0776L21.5897 20.0632L21.5823 20.054C21.3344 19.7691 21.0939 19.4564 20.8553 19.1623C20.7017 18.9625 20.539 18.7719 20.3762 18.5721C21.3677 18.8311 22.3685 19.0753 23.3509 19.3084C24.2148 19.5175 25.112 19.7339 25.9926 19.9596L40.8754 23.6262C39.2253 25.4133 37.5659 27.2244 35.9601 28.9763ZM31.659 45.8737C31.7533 44.9635 31.8569 44.0274 31.942 43.108C32.0197 42.3699 32.0956 41.617 32.1733 40.8973C32.2917 39.743 32.4212 38.5479 32.5248 37.3769L32.5488 37.1697C32.6339 36.4223 32.719 35.6527 32.7708 34.8794C32.8704 34.8232 32.9736 34.7738 33.0798 34.7314C33.2074 34.6722 33.335 34.6204 33.4627 34.5428C35.4384 33.492 37.4123 32.4431 39.3955 31.4034C41.3712 30.3637 43.3969 29.2871 45.406 28.2215C43.583 30.8988 41.7676 33.5812 39.9597 36.2688C38.4298 38.5294 36.8573 40.8622 35.2923 43.1598C34.6781 44.0792 34.0362 45.0153 33.4294 45.9162C32.7449 46.9226 32.0438 47.953 31.3611 48.9871C31.4462 47.9456 31.548 46.8967 31.659 45.8737ZM19.7453 20.6182C19.6343 20.3055 19.5122 19.9855 19.4105 19.6821C21.7192 22.5088 24.0428 25.3522 26.3089 28.1086C27.48 29.5386 28.651 30.9613 29.822 32.4005C30.0532 32.6688 30.2845 32.9555 30.5065 33.233C30.7969 33.5882 31.0874 33.9619 31.4037 34.3171C31.3001 35.2087 31.215 36.1115 31.1207 36.9773C31.0615 37.5841 31.0023 38.1927 30.9338 38.8087V38.8161C30.9079 39.2046 30.8561 39.5968 30.8136 39.9779L30.6175 41.7039L30.6082 41.7631C30.4547 43.515 30.266 45.2836 30.0865 47.0003C30.0107 47.7107 29.9422 48.4396 29.8645 49.1684C29.822 49.0389 29.772 48.9076 29.7276 48.7855C29.5973 48.4321 29.4721 48.0769 29.3521 47.7199L28.4364 45.1448L19.7435 20.6182" fill="url(#paint114_linear)"></path> <defs> <linearGradient id="paint114_linear" x1="0" y1="0" x2="0" y2="65" gradientUnits="userSpaceOnUse"> <stop stop-color="#FC2D38"></stop> <stop offset="1" stop-color="#A50009"></stop> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-dot" viewBox="0 0 65 65"> <title>dot</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M39.0737 0.644557C34.8752 -0.201829 30.5498 -0.214782 26.3462 0.606449C22.1426 1.42768 18.1438 3.0669 14.5793 5.4299C11.0149 7.79289 7.9552 10.8331 5.57612 14.3757C3.19704 17.9184 1.54552 21.8937 0.716377 26.0731C-0.185902 30.2517 -0.236398 34.5679 0.567919 38.7663C1.37224 42.9647 3.01496 46.9601 5.39905 50.5162C7.78313 54.0723 10.8601 57.117 14.448 59.47C18.0359 61.8231 22.0619 63.4368 26.2879 64.2158C30.4861 65.1654 34.835 65.2535 39.0687 64.4748C43.3023 63.6961 47.3319 62.0669 50.9108 59.6867C54.4897 57.3066 57.5426 54.2256 59.8832 50.6322C62.2238 47.0387 63.8027 43.0083 64.5235 38.7873C65.9585 30.4029 64.1249 21.79 59.3964 14.7031C54.6678 7.61621 47.4 2.5886 39.0737 0.644557ZM35.8099 49.6321C35.4542 49.5588 35.0878 49.5576 34.7318 49.6288C34.3757 49.6999 34.0369 49.8419 33.735 50.0466C33.4331 50.2513 33.1739 50.5147 32.9723 50.8216C32.7708 51.1285 32.6309 51.4729 32.5607 51.8349C32.4843 52.1969 32.48 52.5708 32.5481 52.9345C32.6162 53.2982 32.7554 53.6444 32.9573 53.9524C33.1593 54.2605 33.4199 54.5242 33.7239 54.7281C34.0278 54.9319 34.3688 55.0717 34.7268 55.1392C35.0824 55.2215 35.4508 55.2291 35.8095 55.1616C36.1681 55.0942 36.5094 54.953 36.8126 54.7469C37.1157 54.5407 37.3744 54.2738 37.5726 53.9625C37.7709 53.6512 37.9046 53.302 37.9657 52.9364C38.0873 52.21 37.9319 51.4639 37.5314 50.85C37.1308 50.236 36.5152 49.8005 35.8099 49.6321ZM21.3054 15.8878C24.3853 12.7557 28.558 10.9887 32.9136 10.9721C37.1153 11.0462 41.1294 12.7545 44.1306 15.7459C47.1317 18.7372 48.8919 22.7842 49.0491 27.0548C49.2063 31.3253 47.7486 35.4947 44.9758 38.7059C42.2029 41.9171 38.3256 43.9258 34.1411 44.3191C34.1411 44.3191 32.0472 44.466 31.5521 44.5393C30.3721 44.7228 29.2758 45.2695 28.4108 46.106C27.5458 46.9426 26.9537 48.0286 26.7144 49.2178C26.7144 49.2178 26.0645 52.4486 25.9923 52.7423C25.9376 53.0401 25.8239 53.3233 25.6582 53.5751C25.4925 53.8267 25.2782 54.0414 25.0283 54.2064C24.7784 54.3712 24.4982 54.4826 24.2047 54.5339C23.9111 54.5851 23.6104 54.5752 23.3208 54.5046C23.0282 54.4492 22.7499 54.3335 22.5028 54.1648C22.2558 53.9962 22.0452 53.7779 21.8839 53.5236C21.7226 53.2693 21.6141 52.9841 21.565 52.6857C21.5159 52.3872 21.5271 52.0816 21.5982 51.7878C21.5982 51.5675 26.7556 27.2102 26.7556 27.2102C26.8801 26.6163 27.2315 26.097 27.7326 25.7665C28.2335 25.4359 28.8431 25.3214 29.4272 25.448C30.0112 25.5745 30.5219 25.9319 30.8469 26.4415C31.1719 26.951 31.2846 27.5709 31.1601 28.1648L28.994 38.1406L28.6329 40.1232C28.6106 40.1535 28.5998 40.1909 28.6024 40.2287C28.6051 40.2665 28.621 40.3021 28.6473 40.3289C28.6737 40.3556 28.7086 40.3718 28.7458 40.3745C28.783 40.3772 28.8198 40.3662 28.8496 40.3434C29.2643 40.2365 29.6844 40.1525 30.108 40.0917C31.2633 39.9448 33.5635 39.798 33.5635 39.798C35.8598 39.6566 38.0663 38.8392 39.914 37.4452C41.7617 36.0513 43.1709 34.141 43.9701 31.9471C44.7692 29.7532 44.9238 27.3703 44.4149 25.0887C43.9061 22.807 42.7558 20.7251 41.1041 19.0964C39.4525 17.4677 37.3708 16.3627 35.1126 15.9157C32.8542 15.4688 30.5169 15.6993 28.3853 16.5792C26.2536 17.4592 24.4195 18.9504 23.1064 20.8715C21.7933 22.7925 21.0578 25.0605 20.9896 27.3991C20.9234 28.8478 21.1407 30.2954 21.6291 31.658C21.8074 32.2371 21.7614 32.8637 21.5007 33.4096C21.24 33.9555 20.7841 34.3795 20.2263 34.5951C19.6515 34.7715 19.0322 34.7176 18.4952 34.4445C17.9582 34.1715 17.5442 33.7 17.3381 33.1265C16.764 31.3744 16.4714 29.5396 16.4716 27.6928C16.4879 23.2633 18.2255 19.02 21.3054 15.8878Z" fill="url(#paint150_linear)"/> <defs> <linearGradient id="paint150_linear" x1="32.5" y1="0" x2="32.5" y2="65" gradientUnits="userSpaceOnUse"> <stop stop-color="#FF299B"/> <stop offset="1" stop-color="#E6007A"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-macos" viewBox="0 0 86 86"> <title>macos</title> <rect width="86" height="86" rx="6" fill="#fff"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M50.812 25.308c1.821-2.199 3.044-5.255 2.71-8.308-2.615.103-5.793 1.748-7.663 3.94-1.679 1.951-3.15 5.06-2.76 8.045 2.918.226 5.9-1.48 7.713-3.677zM64.34 55.144c-.065.178-1.096 3.732-3.605 7.39-2.161 3.172-4.415 6.333-7.96 6.395-3.476.068-4.596-2.061-8.577-2.061-3.98 0-5.222 1.999-8.517 2.13-3.424.133-6.02-3.426-8.21-6.582-4.47-6.455-7.876-18.247-3.301-26.198 2.281-3.953 6.344-6.45 10.76-6.518 3.365-.056 6.53 2.258 8.584 2.258 2.055 0 5.901-2.798 9.954-2.387 1.69.076 6.45.684 9.512 5.158-.253.16-5.683 3.316-5.623 9.897.068 7.868 6.903 10.487 6.983 10.518z" fill="#3C3C3C"/> </symbol> <symbol fill="none" id="sprite-msite" viewBox="0 0 31 31"> <title>msite</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15.347C0 6.997 6.88.23 15.368.23c8.487 0 15.367 6.768 15.367 15.118 0 8.35-6.88 15.119-15.367 15.119C6.88 30.466 0 23.697 0 15.347zm12.896-4.071l-4.92-2.392a.274.274 0 00-.119-.03.16.16 0 00-.126.056.227.227 0 00-.047.15v10.267c0 .175.131.382.292.46l4.547 2.21a.41.41 0 00.178.045c.153 0 .26-.115.26-.308V11.378a.114.114 0 00-.065-.102zm10.181 10.718l-4.418-2.148 4.857-7.672v9.556c0 .262-.197.38-.438.264zm-9.65-9.95v5.262l4.812 2.339-4.811-7.6zm4.958-3.23L23.4 11.25c.063.03.085.106.048.164l-4.935 7.797-3.451-5.451 3.091-4.884a.184.184 0 01.155-.081h.005a.18.18 0 01.072.017z" fill="#fff"/> </symbol> <symbol fill="none" id="sprite-playstore" viewBox="0 0 133 44"> <title>playstore</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.128 0h122.32c1.783 0 2.429.186 3.081.535a3.63 3.63 0 011.512 1.512c.349.651.535 1.298.535 3.08v33.745c0 1.783-.186 2.43-.535 3.081a3.63 3.63 0 01-1.512 1.512c-.652.35-1.298.535-3.081.535H5.128c-1.783 0-2.43-.186-3.081-.535a3.635 3.635 0 01-1.513-1.512C.187 41.302 0 40.655 0 38.873V5.127c0-1.783.186-2.43.535-3.081A3.635 3.635 0 012.047.534C2.698.187 3.345 0 5.127 0z" fill="#F5F9FB"/> <path d="M13.732 34.763c.604.105 1.318-.025 2.08-.43l13.376-7.103-3.89-3.82-11.566 11.353zm-1.104-24.368c-.332.478-.523 1.136-.523 1.947v19.735c0 .789.181 1.434.496 1.908l11.706-11.809-11.68-11.78zM30 17.155l-13.416-7.107c-.745-.395-1.444-.53-2.04-.44l11.57 11.362 3.887-3.815zm.995 9.51l3.886-2.02c2.17-1.126 2.674-3.472.502-4.596l-3.907-2.024-4.73 4.56 4.25 4.08zM53.59 15.898a1.91 1.91 0 01-.863.614 3.52 3.52 0 01-1.253.21 2.47 2.47 0 01-1.276-.328 2.194 2.194 0 01-.86-.934c-.199-.407-.303-.88-.31-1.422v-.45c0-.866.207-1.542.622-2.028.415-.489.994-.733 1.737-.733.639 0 1.146.158 1.521.473.376.315.602.77.678 1.363h-.977c-.11-.69-.511-1.036-1.202-1.036-.446 0-.787.161-1.02.484-.231.32-.351.792-.359 1.415v.441c0 .62.13 1.102.39 1.446.263.341.627.512 1.092.512.51 0 .872-.115 1.087-.347v-1.122h-1.182v-.757h2.175v2.199zm2.88.823c-.607 0-1.1-.19-1.477-.571-.376-.384-.564-.893-.564-1.529v-.118c0-.426.081-.805.244-1.139.166-.336.397-.597.694-.784.297-.186.628-.28.993-.28.58 0 1.028.186 1.343.556.318.37.477.894.477 1.572v.386h-2.786c.03.352.146.63.351.835.208.205.468.308.78.308.439 0 .796-.178 1.072-.532l.516.492c-.17.255-.4.454-.686.595a2.13 2.13 0 01-.957.21zm-.114-3.652a.812.812 0 00-.639.275c-.16.184-.262.44-.307.769h1.824v-.071c-.02-.32-.106-.562-.256-.725-.15-.165-.357-.248-.622-.248zm3.77-1.726v1.036h.753v.71h-.753v2.38c0 .162.032.28.095.354.066.07.181.106.347.106.11 0 .222-.013.335-.04v.742c-.218.06-.429.09-.63.09-.736 0-1.104-.406-1.104-1.217v-2.416h-.701v-.709h.7v-1.036h.958zm4.516 5.299h-.958V12.38h.958v4.263zm-1.017-5.37a.51.51 0 01.138-.366c.095-.098.229-.146.402-.146.173 0 .307.049.402.146a.505.505 0 01.142.366.5.5 0 01-.142.363c-.095.094-.229.141-.402.141-.174 0-.308-.047-.402-.141a.507.507 0 01-.138-.363zm3.262.071v1.036h.753v.71h-.753v2.38c0 .162.032.28.095.354.066.07.181.106.347.106.11 0 .222-.013.335-.04v.742c-.218.06-.429.09-.63.09-.736 0-1.104-.406-1.104-1.217v-2.416h-.701v-.709h.701v-1.036h.957zm3.318 3.128c0-.417.083-.793.248-1.127.166-.336.398-.593.697-.772.3-.18.644-.272 1.033-.272.575 0 1.041.186 1.398.556.36.37.555.861.584 1.473l.003.225c0 .42-.08.796-.244 1.127-.16.33-.391.587-.693.768-.3.181-.646.272-1.04.272-.602 0-1.084-.2-1.446-.599-.36-.402-.54-.936-.54-1.603v-.048zm.957.083c0 .439.09.783.272 1.032.181.247.434.37.757.37a.87.87 0 00.752-.377c.181-.253.272-.622.272-1.108 0-.43-.093-.772-.28-1.024a.882.882 0 00-.752-.378.877.877 0 00-.745.374c-.184.247-.276.617-.276 1.111zm4.705-2.174l.027.492c.316-.381.73-.572 1.241-.572.888 0 1.34.509 1.356 1.525v2.817h-.958V13.88c0-.27-.059-.47-.177-.599-.116-.13-.306-.197-.571-.197-.386 0-.674.175-.863.524v3.034h-.958V12.38h.903zm-24.49 17.413v3.997h-1.87V23.034h4.116c1.201 0 2.154.312 2.859.938.709.625 1.063 1.453 1.063 2.482 0 1.054-.347 1.874-1.041 2.46-.69.586-1.657.88-2.904.88h-2.223zm0-1.5h2.246c.665 0 1.172-.155 1.522-.465.35-.315.524-.768.524-1.36 0-.58-.177-1.043-.532-1.388-.355-.35-.842-.53-1.463-.54h-2.297v3.754zm9.545 5.497h-1.796V22.443h1.796V33.79zm6.737 0c-.079-.153-.148-.401-.207-.746a2.795 2.795 0 01-2.098.894c-.803 0-1.458-.23-1.965-.687a2.198 2.198 0 01-.761-1.7c0-.852.315-1.504.946-1.957.635-.458 1.541-.687 2.718-.687h1.101v-.525c0-.414-.116-.744-.347-.99-.232-.25-.584-.377-1.057-.377-.408 0-.743.104-1.004.31a.939.939 0 00-.392.777h-1.795c0-.439.145-.848.436-1.227.29-.384.684-.684 1.182-.901a4.192 4.192 0 011.677-.325c.935 0 1.682.236 2.238.709.557.468.842 1.128.857 1.98v3.605c0 .719.101 1.293.303 1.721v.126h-1.832zm-1.973-1.293c.355 0 .688-.086.998-.258.315-.173.551-.404.709-.695v-1.507h-.968c-.665 0-1.165.116-1.5.347-.334.232-.502.56-.502.983 0 .345.114.62.34.827.231.202.54.303.923.303zm8.06-1.278l1.626-5.422h1.913L74.108 35c-.487 1.345-1.315 2.017-2.482 2.017-.261 0-.55-.044-.864-.133v-1.389l.34.023c.453 0 .792-.084 1.019-.252.232-.162.414-.438.547-.827l.258-.687-2.807-7.956h1.936l1.691 5.422zm14.14-.199c0-.473-.167-.838-.502-1.094-.33-.256-.929-.514-1.796-.775-.866-.261-1.556-.552-2.068-.872-.98-.616-1.47-1.419-1.47-2.409 0-.866.352-1.58 1.056-2.142.71-.561 1.628-.842 2.756-.842.748 0 1.416.138 2.002.414.586.275 1.046.67 1.381 1.182a3 3 0 01.503 1.691h-1.862c0-.561-.177-1-.532-1.315-.35-.32-.852-.48-1.507-.48-.61 0-1.086.13-1.426.392-.335.26-.502.625-.502 1.093 0 .394.182.724.547.99.364.261.965.517 1.802.768.837.247 1.51.53 2.017.85.507.315.879.68 1.115 1.093.237.409.355.89.355 1.44 0 .897-.345 1.611-1.034 2.143-.685.527-1.616.79-2.793.79a5.319 5.319 0 01-2.15-.428c-.65-.29-1.157-.69-1.521-1.197-.36-.507-.54-1.098-.54-1.773h1.87c0 .611.201 1.084.605 1.419.404.335.983.502 1.736.502.65 0 1.138-.13 1.463-.391.33-.266.495-.616.495-1.05zm5.584-7.166v1.943h1.412v1.33H93.47v4.461c0 .306.059.527.177.665.123.133.34.2.65.2.207 0 .416-.025.628-.074v1.389a4.42 4.42 0 01-1.182.17c-1.379 0-2.068-.761-2.068-2.283v-4.529H90.36v-1.33h1.315v-1.942h1.795zm2.232 5.866c0-.784.155-1.488.465-2.113.31-.63.746-1.114 1.308-1.448.561-.34 1.207-.51 1.936-.51 1.078 0 1.952.347 2.622 1.041.675.695 1.039 1.616 1.093 2.763l.008.422c0 .788-.153 1.492-.458 2.112a3.33 3.33 0 01-1.3 1.44c-.562.34-1.212.51-1.95.51-1.129 0-2.032-.374-2.712-1.122-.675-.754-1.012-1.756-1.012-3.007v-.089zm1.795.155c0 .822.17 1.467.51 1.935.34.463.813.694 1.418.694.606 0 1.076-.236 1.411-.709.34-.473.51-1.165.51-2.076 0-.807-.175-1.448-.524-1.92-.345-.473-.816-.71-1.412-.71-.586 0-1.051.234-1.396.702-.344.463-.517 1.158-.517 2.084zm11.34-2.438a4.37 4.37 0 00-.731-.06c-.823 0-1.377.316-1.663.946v5.467h-1.795v-7.993h1.714l.044.893c.434-.694 1.035-1.041 1.803-1.041.256 0 .468.034.635.103l-.007 1.685zm4.506 6.501c-1.137 0-2.061-.358-2.77-1.072-.704-.719-1.056-1.674-1.056-2.866v-.222c0-.797.152-1.51.458-2.135.31-.63.743-1.12 1.3-1.47a3.425 3.425 0 011.861-.524c1.089 0 1.929.347 2.52 1.041.596.695.894 1.677.894 2.948v.724h-5.223c.054.66.273 1.182.657 1.566.389.384.877.576 1.463.576.822 0 1.492-.332 2.009-.997l.968.924c-.32.477-.749.85-1.285 1.115-.532.261-1.131.392-1.796.392zm-.214-6.849c-.492 0-.891.173-1.197.518-.3.344-.492.824-.576 1.44h3.421v-.133c-.04-.6-.2-1.054-.481-1.36-.28-.31-.669-.465-1.167-.465z" fill="#135"/> </symbol> <symbol fill="none" id="sprite-rating" viewBox="0 0 144 23"> <title>rating</title> <path d="M23.335 8.433h-8.91L11.671 0l-2.76 8.433L0 8.425l7.217 5.217-2.761 8.425 7.216-5.209 7.208 5.209-2.752-8.425 7.207-5.209z" fill="#3692FE"/> <path d="M16.747 15.55l-.62-1.908-4.455 3.216 5.075-1.309z" fill="#005128"/> <path d="M53.336 8.433h-8.911L41.672 0l-2.761 8.433L30 8.425l7.217 5.217-2.761 8.425 7.216-5.209 7.208 5.209-2.752-8.425 7.208-5.209z" fill="#3692FE"/> <path d="M46.747 15.55l-.62-1.908-4.455 3.216 5.075-1.309z" fill="#005128"/> <path d="M83.335 8.433h-8.91L71.671 0 68.91 8.433 60 8.425l7.216 5.217-2.76 8.425 7.216-5.209 7.208 5.209-2.752-8.425 7.207-5.209z" fill="#3692FE"/> <path d="M76.747 15.55l-.62-1.908-4.455 3.216 5.075-1.309z" fill="#005128"/> <path d="M113.336 8.433h-8.912L101.672 0l-2.761 8.433L90 8.425l7.216 5.217-2.76 8.425 7.216-5.209 7.208 5.209-2.752-8.425 7.208-5.209z" fill="#3692FE"/> <path d="M106.747 15.55l-.62-1.908-4.455 3.216 5.075-1.309z" fill="#005128"/> <path d="M143.336 8.433h-8.912L131.672 0l-2.761 8.433L120 8.425l7.217 5.217-2.761 8.425 7.216-5.209 7.208 5.209-2.752-8.425 7.208-5.209z" fill="#3692FE"/> <path d="M136.747 15.55l-.62-1.908-4.455 3.216 5.075-1.309z" fill="#005128"/> </symbol> <symbol fill="none" id="sprite-referral" viewBox="0 0 20 20"> <title>referral</title> <g clip-path="url(#clip0)" fill="#B1BDCD" stroke="#B1BDCD" stroke-width=".2"> <path d="M10.9 13.8h-.1v.1a.8.8 0 01-.218.582.8.8 0 01-.582.218H3.7a.8.8 0 01-.582-.218.8.8 0 01-.218-.582v-3.6a.8.8 0 01.218-.582A.8.8 0 013.7 9.5H10a.8.8 0 01.582.218.8.8 0 01.218.582v.1h2v-.1c0-1.585-1.215-2.8-2.8-2.8H3.7C2.115 7.5.9 8.715.9 10.3v3.6c0 1.585 1.215 2.8 2.8 2.8H10c1.585 0 2.8-1.215 2.8-2.8v-.1h-1.9z"/> <path d="M7.2 6.7v.1h2v-.1a.8.8 0 01.219-.582.8.8 0 01.582-.218h6.3a.8.8 0 01.582.218.8.8 0 01.218.582v3.6a.8.8 0 01-.218.582.8.8 0 01-.582.218H10a.8.8 0 01-.582-.218.8.8 0 01-.218-.582v-.1h-2v.1c0 1.585 1.215 2.8 2.8 2.8h6.3c1.585 0 2.8-1.215 2.8-2.8V6.7c0-1.585-1.215-2.8-2.8-2.8H10c-1.585 0-2.8 1.215-2.8 2.8z"/> </g> <defs> <clipPath id="clip0"> <path fill="#fff" d="M0 0h20v20H0z"/> </clipPath> </defs> </symbol> <symbol class="svg-icon" id="sprite-telegram-header" viewBox="0 0 16 14"> <title>telegram-header</title> <path d="M6.737 12.057c-.198.19-.361.346-.72.346l.251-3.69 6.823-6.057c.3-.262-.066-.39-.463-.152L4.208 7.73.57 6.613c-.786-.236-.791-.767.176-1.15L14.92.088c.647-.289 1.272.153 1.025 1.128l-2.414 11.19c-.168.795-.657.985-1.333.618L8.52 10.35l-1.767 1.691-.017.016z" fill="var(--header-icons-bg)"/> </symbol> <symbol fill="none" id="sprite-telegramm" viewBox="0 0 31 31"> <title>telegramm</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.368 30.466c8.487 0 15.367-6.769 15.367-15.119S23.855.23 15.368.23C6.88.229 0 6.997 0 15.347c0 8.35 6.88 15.119 15.368 15.119zm-2.818-8.19c.374 0 .545-.163.751-.36l.018-.017 1.845-1.766 3.84 2.791c.707.384 1.218.185 1.393-.645l2.521-11.687c.259-1.018-.394-1.48-1.07-1.178L7.045 15.029c-1.01.399-1.004.954-.184 1.2l3.799 1.167 8.794-5.458c.415-.248.796-.115.484.158l-7.126 6.326-.262 3.855z" fill="#fff"/> </symbol> <symbol fill="none" id="sprite-trust-pilot" viewBox="0 0 317 35"> <title>trust-pilot</title> <path d="M179.492 17.431c-.437.57-1.043 1.002-1.818 1.295-.774.293-1.654.44-2.639.44-1.013 0-1.91-.23-2.69-.689-.78-.46-1.383-1.115-1.809-1.967-.421-.858-.64-1.857-.656-2.997v-.946c0-1.826.437-3.251 1.311-4.275.875-1.03 2.095-1.544 3.661-1.544 1.345 0 2.413.332 3.204.996.791.664 1.267 1.622 1.428 2.872h-2.059c-.232-1.455-1.076-2.183-2.531-2.183-.941 0-1.658.34-2.15 1.021-.487.675-.739 1.669-.756 2.98v.93c0 1.306.274 2.321.822 3.046.553.72 1.32 1.08 2.299 1.08 1.074 0 1.838-.244 2.291-.731v-2.366h-2.49V12.8h4.582v4.632zm8.789-3.088h-2.341V19h-2.1V6.914h4.25c1.394 0 2.471.313 3.229.938s1.137 1.53 1.137 2.714c0 .808-.196 1.486-.589 2.034-.388.542-.93.96-1.627 1.254l2.714 5.038V19h-2.249l-2.424-4.657zm-2.341-1.685h2.158c.708 0 1.262-.177 1.66-.531.399-.36.598-.85.598-1.47 0-.647-.185-1.148-.556-1.502-.365-.354-.913-.537-1.644-.548h-2.216v4.051zm17.612.947h-4.964v3.718h5.803V19h-7.903V6.914h7.844v1.693h-5.744v3.337h4.964v1.66zm11.354 2.581h-4.682L209.245 19h-2.184l4.566-12.086h1.884L218.085 19h-2.192l-.987-2.814zm-4.093-1.693h3.503l-1.751-5.014-1.752 5.014zm18.426-5.886h-3.768V19h-2.084V8.607h-3.735V6.914h9.587v1.693zm13.85 5.736h-2.341V19h-2.1V6.914h4.25c1.395 0 2.471.313 3.229.938s1.137 1.53 1.137 2.714c0 .808-.196 1.486-.589 2.034-.387.542-.93.96-1.627 1.254l2.714 5.038V19h-2.249l-2.424-4.657zm-2.341-1.685h2.159c.708 0 1.261-.177 1.66-.531.398-.36.597-.85.597-1.47 0-.647-.185-1.148-.556-1.502-.365-.354-.913-.537-1.643-.548h-2.217v4.051zm17.314 3.528h-4.682L252.401 19h-2.184l4.566-12.086h1.884L261.241 19h-2.191l-.988-2.814zm-4.093-1.693h3.503l-1.751-5.014-1.752 5.014zm18.426-5.886h-3.768V19h-2.084V8.607h-3.735V6.914h9.587v1.693zM278.245 19h-2.092V6.914h2.092V19zm14.209 0h-2.1l-5.387-8.575V19h-2.1V6.914h2.1l5.404 8.608V6.914h2.083V19zm13.786-1.569c-.437.57-1.043 1.002-1.818 1.295-.775.293-1.655.44-2.64.44-1.012 0-1.909-.23-2.689-.689-.78-.46-1.384-1.115-1.81-1.967-.42-.858-.639-1.857-.655-2.997v-.946c0-1.826.437-3.251 1.311-4.275.874-1.03 2.095-1.544 3.661-1.544 1.344 0 2.412.332 3.204.996.791.664 1.267 1.622 1.428 2.872h-2.059c-.233-1.455-1.076-2.183-2.532-2.183-.941 0-1.657.34-2.15 1.021-.487.675-.738 1.669-.755 2.98v.93c0 1.306.274 2.321.822 3.046.553.72 1.32 1.08 2.299 1.08 1.074 0 1.837-.244 2.291-.731v-2.366h-2.49V12.8h4.582v4.632zM23.5 8.981h-8.973L11.755 0l-2.78 8.981L0 8.971l7.268 5.557L4.487 23.5l7.268-5.547 7.259 5.547-2.772-8.972L23.5 8.981z" fill="#fff"/> <path d="M16.865 16.56l-.624-2.032-4.487 3.425 5.11-1.394z" fill="#197BBF"/> <path d="M53.714 8.981h-8.975L41.968 0l-2.781 8.981-8.974-.01 7.267 5.557L34.7 23.5l7.267-5.547 7.26 5.547-2.772-8.972 7.259-5.547z" fill="#fff"/> <path d="M47.078 16.56l-.624-2.032-4.487 3.425 5.11-1.394z" fill="#197BBF"/> <path d="M83.926 8.981h-8.974L72.18 0 69.4 8.981l-8.974-.01 7.267 5.557-2.78 8.972 7.267-5.547 7.26 5.547-2.773-8.972 7.26-5.547z" fill="#fff"/> <path d="M77.288 16.56l-.623-2.032-4.487 3.425 5.11-1.394z" fill="#197BBF"/> <path d="M114.139 8.981h-8.974L102.393 0l-2.78 8.981-8.974-.01 7.267 5.557-2.78 8.972 7.267-5.547 7.259 5.547-2.772-8.972 7.259-5.547z" fill="#fff"/> <path d="M107.503 16.56l-.623-2.032-4.487 3.425 5.11-1.394z" fill="#197BBF"/> <path d="M144.35 8.981h-8.974L132.604 0l-2.78 8.981-8.974-.01 7.267 5.557-2.78 8.972 7.267-5.547 7.259 5.547-2.772-8.972 7.259-5.547z" fill="#fff"/> <path d="M137.712 16.56l-.623-2.032-4.487 3.425 5.11-1.394z" fill="#197BBF"/> </symbol> <symbol fill="none" id="sprite-trx" viewBox="0 0 100 100"> <title>trx</title> <path d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50z" fill="url(#paicvb_linear)"/> <path d="M82.853 35.197C80.017 33.213 76.984 31.1 74.017 29a2.382 2.382 0 00-.213-.147c-.328-.246-.705-.508-1.164-.656l-.033-.016c-7.934-1.918-16-3.886-23.803-5.787-7.082-1.721-14.148-3.443-21.23-5.164-.18-.05-.36-.099-.557-.148-.64-.18-1.377-.377-2.164-.278a1.51 1.51 0 00-.606.23l-.197.163c-.312.295-.476.672-.558.885l-.049.131v.755l.033.114c4.476 12.541 9.066 25.263 13.492 37.574 3.41 9.476 6.95 19.295 10.41 28.935.213.655.82 1.082 1.574 1.147h.163c.705 0 1.328-.344 1.64-.902l12.983-18.934c3.164-4.607 6.328-9.23 9.492-13.836 1.295-1.885 2.59-3.787 3.885-5.672 2.132-3.115 4.328-6.328 6.509-9.46l.114-.163v-.197c.05-.574.066-1.754-.885-2.377zM67.64 42.1c-3.05 1.59-6.164 3.23-9.295 4.852l5.475-5.869c2.28-2.459 4.656-5 6.984-7.492l.05-.049c.196-.262.442-.508.704-.77.18-.18.377-.36.557-.574 1.214.836 2.443 1.689 3.623 2.525a192.57 192.57 0 002.607 1.82A916.76 916.76 0 0067.64 42.1zm-7.836-.787c-2.344 2.54-4.77 5.147-7.18 7.721A4585.957 4585.957 0 0038.558 32.05c-2.098-2.525-4.213-5.066-6.311-7.59l-.017-.017c-.475-.541-.934-1.131-1.393-1.689-.295-.377-.607-.737-.918-1.114 1.901.491 3.82.95 5.705 1.393 1.655.394 3.377.803 5.065 1.23 9.508 2.311 19.033 4.623 28.541 6.934-3.164 3.377-6.344 6.803-9.426 10.115zm-8.246 31.95c.18-1.72.377-3.491.541-5.229.148-1.393.295-2.82.443-4.18.23-2.18.475-4.443.672-6.656l.049-.393c.164-1.41.328-2.87.426-4.328a4.82 4.82 0 01.59-.279c.246-.115.492-.213.738-.36 3.787-1.984 7.574-3.968 11.377-5.935 3.787-1.967 7.672-4 11.525-6.016A3271.244 3271.244 0 0067.476 55.1c-2.934 4.278-5.95 8.688-8.95 13.033-1.181 1.737-2.41 3.508-3.574 5.213a592.048 592.048 0 00-3.968 5.803c.164-1.967.361-3.951.574-5.885zM28.706 25.509c-.213-.59-.443-1.196-.64-1.77a6922.19 6922.19 0 0013.23 15.934c2.246 2.705 4.492 5.394 6.737 8.115.443.508.886 1.05 1.312 1.574.557.672 1.115 1.377 1.721 2.05-.196 1.688-.36 3.393-.54 5.032a276.12 276.12 0 01-.361 3.459v.016c-.05.738-.148 1.476-.23 2.197l-.377 3.262-.016.115c-.295 3.312-.656 6.656-1 9.902-.148 1.344-.279 2.721-.427 4.098-.082-.246-.18-.492-.262-.721a72.802 72.802 0 01-.721-2.017l-1.754-4.868C39.82 56.427 34.263 40.985 28.706 25.51z" fill="#fff"/> <defs> <linearGradient id="paicvb_linear" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse"> <stop stop-color="#F62F53"/> <stop offset="1" stop-color="#BC313E"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-twitter-blue" viewBox="0 0 36 36"> <title>twitter-blue</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.738 1.001C8.19 1.001.449 8.616.449 18.01c0 9.393 7.74 17.008 17.289 17.008 9.548 0 17.288-7.615 17.288-17.009 0-9.393-7.74-17.008-17.288-17.008z" fill="#3692FE"/> <path d="M17.22 14.825l.037.588-.605-.072c-2.201-.276-4.124-1.213-5.756-2.786l-.799-.781-.205.576c-.435 1.286-.157 2.643.75 3.556.483.504.375.576-.46.276-.29-.096-.544-.168-.568-.132-.085.084.205 1.177.435 1.61.315.6.956 1.188 1.657 1.537l.592.276-.7.012c-.678 0-.702.012-.63.264.242.78 1.197 1.61 2.261 1.97l.75.252-.653.384a6.89 6.89 0 01-3.24.89c-.545.011-.992.06-.992.095 0 .12 1.475.793 2.334 1.058 2.575.78 5.635.444 7.933-.89 1.632-.948 3.265-2.834 4.027-4.66.41-.973.822-2.75.822-3.603 0-.552.036-.624.713-1.285.4-.384.774-.805.847-.925.12-.228.109-.228-.508-.024-1.028.36-1.173.312-.665-.228.375-.385.665-1.213.665-1.417 0 0-.024.156-.23.264-.217.12-.701.3-1.064.408l-.653.204-.592-.396c-.327-.216-.787-.456-1.028-.528-.617-.169-1.56-.145-2.117.048-1.511.54-2.467 1.933-2.358 3.459z" fill="#fff"/> </symbol> <symbol fill="none" id="sprite-twitter-footer" viewBox="0 0 31 31"> <title>twitter-footer</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.368.229C6.88.229 0 6.997 0 15.347c0 8.35 6.88 15.119 15.368 15.119 8.487 0 15.367-6.769 15.367-15.119S23.855.23 15.368.23zM14.94 13.04l-.032-.523c-.097-1.356.752-2.594 2.096-3.075.494-.17 1.332-.192 1.88-.042.216.064.624.277.914.47l.527.352.58-.182c.323-.096.753-.256.947-.363.182-.096.343-.15.343-.117 0 .181-.397.8-.73 1.142-.452.48-.323.523.59.203.549-.181.56-.181.452.022-.064.106-.397.48-.752.822-.602.587-.634.65-.634 1.142 0 .758-.366 2.338-.731 3.203-.678 1.623-2.129 3.299-3.58 4.142-2.042 1.185-4.762 1.484-7.051.79-.764-.235-2.075-.832-2.075-.94 0-.031.398-.074.881-.085a6.125 6.125 0 002.881-.79l.58-.341-.666-.225c-.946-.32-1.795-1.056-2.01-1.75-.064-.225-.043-.235.56-.235l.623-.011-.527-.245c-.624-.31-1.193-.833-1.473-1.367-.204-.384-.462-1.356-.387-1.43.022-.033.247.031.505.117.742.267.839.202.409-.246-.806-.811-1.054-2.018-.667-3.16l.183-.513.71.694c1.45 1.399 3.16 2.232 5.116 2.477l.538.064z" fill="#fff"/> </symbol> <symbol class="svg-icon" id="sprite-twitter-header" viewBox="0 0 16 14"> <title>twitter-header</title> <path d="M7.769 3.46l.035.563-.578-.069C5.12 3.69 3.283 2.794 1.723 1.29L.96.544l-.197.551c-.416 1.229-.15 2.526.717 3.399.462.482.358.551-.44.264-.277-.092-.52-.16-.543-.126-.08.08.197 1.125.416 1.538.301.574.914 1.137 1.584 1.47l.567.264-.67.012c-.648 0-.671.011-.602.252.231.747 1.144 1.539 2.162 1.883l.717.242-.625.367a6.588 6.588 0 01-3.098.85c-.52.011-.948.057-.948.091 0 .115 1.41.758 2.231 1.011 2.463.746 5.388.425 7.584-.85 1.561-.907 3.122-2.71 3.85-4.455.393-.93.786-2.63.786-3.445 0-.528.035-.597.682-1.228.382-.368.74-.77.81-.884.115-.219.104-.219-.486-.024-.983.345-1.121.3-.636-.218.359-.367.636-1.16.636-1.355 0 0-.023.15-.22.253-.208.115-.67.287-1.017.39l-.624.196-.567-.38c-.312-.206-.751-.436-.982-.504-.59-.161-1.492-.138-2.024.045C8.578.67 7.665 2.003 7.77 3.46z" fill="var(--header-icons-bg)"/> </symbol> <symbol fill="none" id="sprite-ubuntu" viewBox="0 0 86 86"> <title>ubuntu</title> <rect width="86" height="86" rx="6" fill="#D74722"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M27.357 39.892a3.065 3.065 0 10-.001 6.13 3.065 3.065 0 000-6.13zm21.882 13.931A3.063 3.063 0 1052.3 59.13a3.063 3.063 0 00-3.062-5.307zM34.014 42.958a8.941 8.941 0 013.806-7.325l-2.24-3.754a13.344 13.344 0 00-5.506 7.74 4.3 4.3 0 011.586 3.34 4.297 4.297 0 01-1.587 3.337 13.334 13.334 0 005.506 7.741l2.24-3.754a8.938 8.938 0 01-3.805-7.325zm8.951-8.953c4.677 0 8.514 3.586 8.917 8.159l4.367-.064a13.275 13.275 0 00-3.956-8.637 4.297 4.297 0 01-3.675-.297 4.29 4.29 0 01-2.096-3.04 13.351 13.351 0 00-3.557-.483c-2.118 0-4.122.497-5.9 1.378l2.13 3.816a8.916 8.916 0 013.77-.832zm0 17.906c-1.347 0-2.625-.3-3.77-.833l-2.13 3.817a13.31 13.31 0 009.457.894 4.3 4.3 0 012.096-3.04 4.294 4.294 0 013.675-.297 13.275 13.275 0 003.956-8.636l-4.368-.065c-.402 4.575-4.239 8.16-8.916 8.16zm6.273-19.82a3.064 3.064 0 103.064-5.308 3.064 3.064 0 00-3.064 5.308z" fill="#fff"/> </symbol> <symbol fill="none" id="sprite-wiki-blue" viewBox="0 0 35 35"> <title>wiki-blue</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.289 34.017c9.548 0 17.288-7.615 17.288-17.008C34.577 7.615 26.837 0 17.289 0 7.74 0 0 7.615 0 17.009c0 9.393 7.74 17.008 17.289 17.008z" fill="#3692FE"/> <path d="M7 11h5.118c0 .212.002.424-.005.634 0 .02-.064.043-.104.054-.191.054-.391.089-.573.16a1.458 1.458 0 00-.4.247.643.643 0 00-.165.762c.756 1.696 1.513 3.395 2.271 5.092.465 1.04.927 2.082 1.391 3.12l.06.13c.027-.043.045-.069.06-.095.691-1.257 1.38-2.517 2.074-3.772a.217.217 0 00.009-.219c-.514-1.116-1.018-2.237-1.536-3.354-.222-.478-.48-.941-.704-1.42a.995.995 0 00-.776-.58c-.298-.051-.602-.069-.902-.093-.094-.006-.118-.034-.116-.12.007-.176.002-.353.002-.529h4.845c0 .204.004.394-.005.585 0 .023-.064.054-.102.064-.162.048-.33.078-.486.139a.445.445 0 00-.298.398.369.369 0 00.026.178c.438.95.878 1.898 1.32 2.845.007.013.016.024.027.044.013-.013.025-.02.029-.03.429-.89.864-1.777 1.284-2.671.18-.385.027-.706-.393-.814-.233-.06-.48-.071-.722-.104-.029-.004-.058-.004-.1-.008v-.621h4.298v.595c-.285.065-.563.11-.827.192a1.5 1.5 0 00-.833.645c-.643 1.002-1.151 2.071-1.654 3.143-.117.248-.237.495-.349.746a.228.228 0 00-.004.171c.631 1.394 1.267 2.785 1.902 4.177.016.034.036.069.062.12l.325-.73c1.102-2.474 2.202-4.95 3.309-7.421a.246.246 0 00-.022-.268c-.203-.323-.514-.494-.863-.613-.135-.045-.275-.08-.433-.123V11h.107c1.246.01 2.495.02 3.742.028.038 0 .073-.004.111-.006v.67a1.747 1.747 0 00-1.196.842c-.137.23-.233.48-.342.725l-3.004 6.726c-.58 1.3-1.162 2.602-1.74 3.904-.036.08-.078.104-.165.104a10.288 10.288 0 00-.633.007c-.078.004-.111-.026-.138-.091-.52-1.197-1.04-2.394-1.562-3.59l-.773-1.768a1.533 1.533 0 00-.045-.087c-.026.048-.049.084-.069.119-.937 1.77-1.875 3.54-2.809 5.313-.042.08-.088.106-.177.104a8.801 8.801 0 00-.634 0c-.093.004-.137-.026-.175-.109-.534-1.19-1.08-2.378-1.602-3.572-.714-1.626-1.4-3.262-2.12-4.885a24.189 24.189 0 00-.972-1.965 4.253 4.253 0 00-1.584-1.614c-.08-.048-.173-.08-.26-.12V11z" fill="#fff"/> </symbol> <symbol fill="none" id="sprite-win" viewBox="0 0 86 86"> <title>win</title> <rect width="86" height="86" rx="6" fill="#2FA6FA"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M65.994 20l-24.527 3.569v17.898h24.527V20zM20 26.513l.017 14.954H38.4V24.015L20 26.513zm46 18.02L65.994 66l-24.527-3.45V44.532H66zM20.015 59.64L38.4 62.16V44.533H20.014V59.64z" fill="#fff"/> </symbol> <symbol fill="none" id="sprite-xrp" viewBox="0 0 60 60"> <title>xrp</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M30 60c16.569 0 30-13.431 30-30C60 13.431 46.569 0 30 0 13.431 0 0 13.431 0 30c0 16.569 13.431 30 30 30zm-5.83-34.513c3.936 4.104 10.498 4.104 14.434 0l10.28-10.718h-5.047l-8.144 8.396a6 6 0 01-8.613 0l-8.144-8.396H13.89l10.28 10.718zm0 9.025c3.936-4.105 10.498-4.105 14.434 0l10.28 10.718h-5.047l-8.144-8.396a6 6 0 00-8.613 0l-8.144 8.396H13.89l10.28-10.718z" fill="url(#paintd_linear)"/> <defs> <linearGradient id="paintd_linear" x1="30" y1="0" x2="30" y2="60" gradientUnits="userSpaceOnUse"> <stop stop-color="#8FD4FF"/> <stop offset="1" stop-color="#003CFF"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-aave" viewBox="0 0 65 65"> <title>aave</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 65C50.4493 65 65 50.4493 65 32.5C65 14.5507 50.4493 0 32.5 0C14.5507 0 0 14.5507 0 32.5C0 50.4493 14.5507 65 32.5 65ZM36.2891 15.4L48.9698 45.76C48.9698 45.8565 48.9785 45.9443 48.9865 46.0258C49.0085 46.2486 49.0259 46.4243 48.849 46.6C48.849 47.2 48.6075 47.8 48.2452 48.28C47.7621 48.64 47.1583 48.88 46.5544 48.88C46.0714 48.88 45.5883 48.64 45.226 48.4C44.8637 48.04 44.6221 47.68 44.3806 47.2L32.4245 17.44L28.0769 28.36H30.2507C31.5791 28.36 32.5453 29.44 32.5453 30.64V30.76C32.5453 32.08 31.4584 33.04 30.2507 33.04H26.2653L20.4684 47.32C20.3477 47.8 19.9854 48.28 19.6231 48.52C19.2607 48.88 18.7777 49 18.2946 49C17.6908 49 17.0869 48.76 16.6038 48.28C16.2415 47.8 16 47.2 16 46.6C16 46.36 16 46.12 16.1208 45.76L21.3138 33.16H19.14C17.8115 33.16 16.8454 32.08 16.8454 30.88C16.8454 29.56 17.9323 28.6 19.14 28.6H23.3669L28.8015 15.4C29.2845 13.96 30.4922 13 32.0622 13H33.1491C34.5984 13.12 35.806 14.08 36.2891 15.4Z" fill="url(#paint00_linear)"/> <defs> <linearGradient id="paint00_linear" x1="33" y1="-7" x2="33" y2="65" gradientUnits="userSpaceOnUse"> <stop stop-color="#31ABBC"/> <stop offset="1" stop-color="#A74B95"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-nem" viewBox="0 0 65 65"> <title>nem</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 65C50.4493 65 65 50.4493 65 32.5C65 14.5507 50.4493 0 32.5 0C14.5507 0 0 14.5507 0 32.5C0 50.4493 14.5507 65 32.5 65ZM22.0588 16.6083C19.2462 17.4485 16.5732 18.6089 14.0199 20.0894C14.0199 20.1894 14.0199 20.2494 14 20.3495C14 21.8099 14.0997 23.2704 14.2793 24.7309C14.4388 26.0513 14.6583 27.3517 14.9575 28.6521C14.9974 28.8722 15.0772 29.0923 15.1769 29.3124C16.9722 33.1336 21.1213 35.1742 25.2304 34.2339C28.3622 33.5137 30.8955 31.0929 31.7732 27.9919C32.0325 27.1317 32.1123 26.2514 32.1323 25.3711C32.1522 24.7909 32.2121 24.2107 32.3118 23.6305C32.99 20.1094 35.3239 17.2085 38.6152 15.828C38.705 15.788 38.7997 15.753 38.8945 15.718L38.8945 15.718C38.9893 15.683 39.084 15.648 39.1738 15.6079C39.2136 15.6079 39.2535 15.5879 39.2336 15.5479C38.715 15.3479 35.6231 15.0478 33.768 15.0077C29.7785 14.9277 25.8887 15.4679 22.0588 16.6083ZM43.4618 43.8752L43.4425 44.0571C43.5175 44.0195 43.5611 43.9741 43.6029 43.9307L43.6029 43.9306C43.6278 43.9047 43.6521 43.8795 43.6819 43.857C44.4798 42.8567 45.2378 41.8164 45.936 40.736C48.4493 36.8548 50.1848 32.6734 51.1622 28.152C51.4814 26.6315 51.7207 25.071 51.8604 23.5105C51.9402 22.4501 52 21.3698 52 20.3095C52 20.2694 51.995 20.2344 51.99 20.1994C51.985 20.1644 51.9801 20.1294 51.9801 20.0894C51.9003 20.036 51.8382 20.0005 51.7762 19.9649C51.7451 19.9471 51.7141 19.9293 51.6808 19.9093C50.863 19.4492 50.0451 19.009 49.1874 18.6089C47.9507 18.0287 46.7139 17.4885 45.4173 17.0884C43.8415 16.5883 42.2656 16.5482 40.6499 16.9284C36.0819 18.0287 33.1696 22.5102 34.0273 27.1517C34.506 29.7325 35.8625 31.7131 38.0766 33.1136C38.1465 33.1636 38.2213 33.2086 38.2961 33.2536L38.2961 33.2537L38.2962 33.2537C38.3709 33.2987 38.4457 33.3437 38.5155 33.3937C40.1312 34.394 41.3879 35.7144 42.2856 37.375C43.2231 39.1155 43.642 40.9961 43.5423 42.9768C43.5255 43.2785 43.4948 43.5662 43.4618 43.8752ZM33.01 53C32.7108 52.88 31.7932 52.3198 30.8158 51.6596C28.6415 50.1991 26.6268 48.5186 24.7916 46.638C22.9564 44.7573 21.3207 42.6967 19.9244 40.476C18.6079 38.4153 17.5108 36.2546 16.6331 33.9739C16.6281 33.9589 16.6231 33.9451 16.6181 33.9314C16.6032 33.8901 16.5882 33.8488 16.5732 33.7738C16.6113 33.7967 16.6407 33.8138 16.6658 33.8284C16.7064 33.852 16.7357 33.8691 16.7727 33.8938C17.4709 34.434 18.2089 34.8942 19.0068 35.2343C20.0242 35.6744 21.0814 35.9745 22.1984 36.0746C24.4525 36.2946 26.5669 35.8345 28.5617 34.7141C29.599 34.1339 30.716 33.7538 31.8929 33.5938C36.0619 33.0736 40.211 35.5544 41.5076 39.8758C42.1659 42.0965 41.9664 44.2572 40.9491 46.3579C40.9018 46.4528 40.8568 46.5454 40.8125 46.6364C40.7261 46.8142 40.6425 46.9862 40.5501 47.1581C40.4703 47.3182 40.3706 47.4782 40.231 47.5983C38.1165 49.5989 35.8026 51.3595 33.2892 52.84L33.2891 52.84L33.2891 52.8401C33.1894 52.9 33.0897 52.96 33.01 53Z" fill="url(#paint000_linear)"/> <defs> <linearGradient id="paint000_linear" x1="32.5" y1="0" x2="32.5" y2="65" gradientUnits="userSpaceOnUse"> <stop offset="0.0497238" stop-color="#FFAD00"/> <stop offset="0.497238" stop-color="#A8E37C"/> <stop offset="1" stop-color="#00D5C3"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-xtz" viewBox="0 0 100 100"> <title>xtz</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50zm-2.978-23.09C49.01 78.99 52.178 80 56.524 80c2.951 0 5.687-.59 8.216-1.813 2.573-1.224 4.454-3.144 5.687-5.644a18.268 18.268 0 001.88-8.155c0-1.33-.216-2.768-.54-4.42-.324-1.653-1.08-3.359-2.205-5.172-1.124-1.813-2.735-3.25-4.832-4.26-2.033-1.062-3.914-1.598-5.579-1.598-1.016.107-1.989.322-2.897.697l15.34-15.3-2.465-2.447-25.07.054V21.223L41.65 20h-6.443v1.813l2.205 2.19v7.993h-9.719v3.519h9.665v18.863c0 2.714.8 4.903 2.357 6.502 1.61 1.598 4.41 2.392 8.54 2.392 1.665 0 3.168-.482 4.562-1.384 1.395-.9 2.465-2.231 3.222-3.991.025-.195.062-.37.094-.521.037-.174.068-.32.068-.434 0-.483-.162-.901-.487-1.277-.367-.268-.637-.375-.908-.375-.162 0-.27.053-.432.16-.108.054-.216.215-.324.43a12.559 12.559 0 01-2.627 2.66c-1.017.741-2.044 1.117-3.168 1.117-1.395 0-2.465-.483-3.167-1.492-.692-1.02-1.017-2.296-1.017-3.841V35.515h18.94L49.325 53.627v1.491l3.027-1.438c1.665-.901 3.006-1.384 4.13-1.384 1.719 0 3.276.43 4.724 1.33 1.449.848 2.52 2.232 3.276 4.1.746 1.813 1.124 4.002 1.124 6.609 0 2.403-.313 4.528-1.016 6.395-.703 1.867-1.773 3.304-3.222 4.26-1.448.954-3.06 1.437-4.886 1.437-1.297 0-2.584-.16-3.87-.537-1.287-.375-2.249-.965-2.843-1.76.702-.214 1.34-.686 1.827-1.33.486-.633.756-1.491.756-2.553 0-.859-.216-1.599-.54-2.19a3.451 3.451 0 00-1.395-1.383c-.594-.376-1.34-.537-2.205-.537s-1.61.215-2.206.537a3.451 3.451 0 00-1.394 1.384c-.378.59-.54 1.341-.54 2.189 0 2.403.962 4.581 2.95 6.663z" fill="url(#paintlkld_linear)"/> <defs> <linearGradient id="paintlkld_linear" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse"> <stop stop-color="#A9A8FF"/> <stop offset="1" stop-color="#6B69FF"/> </linearGradient> </defs> </symbol> <symbol fill="none" id="sprite-youtube" viewBox="0 0 32 33"> <title>youtube</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M16 32.228c8.837 0 16-7.163 16-16 0-8.836-7.163-16-16-16s-16 7.164-16 16c0 8.837 7.163 16 16 16zM8.538 9.988c1.544-.406 7.692-.406 7.692-.406s6.16 0 7.704.431a2.445 2.445 0 011.725 1.748c.425 1.563.413 4.813.413 4.813s0 3.237-.413 4.788a2.461 2.461 0 01-1.725 1.76c-1.544.406-7.704.406-7.704.406s-6.136 0-7.692-.419a2.52 2.52 0 01-1.737-1.76C6.4 19.811 6.4 16.561 6.4 16.561s0-3.237.401-4.8a2.56 2.56 0 011.737-1.772zm10.851 6.573l-5.115-2.99v5.969l5.115-2.979z" fill="#fff"/> </symbol> <symbol id="main-banner" viewBox="0 0 47 48"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 24C0 11.0213 10.5212 0.5 23.5 0.5C36.4787 0.5 47 11.0213 47 24C47 36.9788 36.4787 47.5 23.5 47.5C10.5212 47.5 0 36.9788 0 24ZM17.6886 12.3547L8.67692 37.3769L14.2573 35.41L21.9554 14.0351C22.424 12.8528 22.9649 12.4272 23.8615 12.4084C24.7582 12.4272 25.2991 12.8528 25.7676 14.0351L33.4658 35.41L39.0462 37.3769L30.0344 12.3547C28.891 9.43333 26.7591 7.77958 23.9249 7.73185V7.73077C23.9038 7.73077 23.8827 7.73084 23.8615 7.73106C23.8404 7.73084 23.8193 7.73077 23.7982 7.73077V7.73185C20.964 7.77958 18.8321 9.43333 17.6886 12.3547ZM23.9145 31.8065C26.0508 31.8065 27.7827 30.0347 27.7827 27.849C27.7827 25.6634 26.0508 23.8915 23.9145 23.8915C21.7781 23.8915 20.0462 25.6634 20.0462 27.849C20.0462 30.0347 21.7781 31.8065 23.9145 31.8065Z" fill="#3692FE"/> </symbol> <symbol id="zil" viewBox="0 0 61 61" fill="none"> <defs> <linearGradient id="zilgradient_3322535" x1="1.776" y1="2.265" x2="1.776" y2="59.38" gradientUnits="userSpaceOnUse"> <stop stop-color="#14D2CF"/> <stop offset="1" stop-color="#0794A0"/> </linearGradient> </defs> <path fill-rule="evenodd" clip-rule="evenodd" d="M.333 30.5c0-16.569 13.431-30 30-30 16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30-16.569 0-30-13.431-30-30zm36.751-.77l4.919-2.193v-4.924l-.023.01-19.112-9.2-4.997 2.193v4.963l13.291 6.39-13.291 6.52v4.893l19.213 9.195v-.005l4.919-2.193v-15.351l-4.919 2.216v10.401l-13.044-6.271 13.044-6.639v-.005z" fill="url(#zilgradient_3322535)"/> </symbol> <symbol id="ada" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5ZM32.985 26.8081C32.985 28.3799 31.7397 29.6541 30.2036 29.6541C28.6675 29.6541 27.4222 28.3799 27.4222 26.8081C27.4222 25.2363 28.6675 23.9622 30.2036 23.9622C31.7397 23.9622 32.985 25.2363 32.985 26.8081ZM36.5906 29.6541C38.1268 29.6541 39.3721 28.3799 39.3721 26.8081C39.3721 25.2363 38.1268 23.9622 36.5906 23.9622C35.0545 23.9622 33.8092 25.2363 33.8092 26.8081C33.8092 28.3799 35.0545 29.6541 36.5906 29.6541ZM42.6685 32.5C42.6685 34.0718 41.4232 35.3459 39.8871 35.3459C38.351 35.3459 37.1057 34.0718 37.1057 32.5C37.1057 30.9282 38.351 29.6541 39.8871 29.6541C41.4232 29.6541 42.6685 30.9282 42.6685 32.5ZM36.7965 41.2486C38.3326 41.2486 39.5779 39.9745 39.5779 38.4027C39.5779 36.8309 38.3326 35.5568 36.7965 35.5568C35.2604 35.5568 34.0151 36.8309 34.0151 38.4027C34.0151 39.9745 35.2604 41.2486 36.7965 41.2486ZM32.985 38.4027C32.985 39.9745 31.7397 41.2486 30.2036 41.2486C28.6675 41.2486 27.4222 39.9745 27.4222 38.4027C27.4222 36.8309 28.6675 35.5568 30.2036 35.5568C31.7397 35.5568 32.985 36.8309 32.985 38.4027ZM26.9071 35.3459C28.4433 35.3459 29.6885 34.0718 29.6885 32.5C29.6885 30.9282 28.4433 29.6541 26.9071 29.6541C25.371 29.6541 24.1257 30.9282 24.1257 32.5C24.1257 34.0718 25.371 35.3459 26.9071 35.3459ZM25.3621 26.9135C25.3621 27.8449 24.6241 28.6 23.7138 28.6C22.8035 28.6 22.0656 27.8449 22.0656 26.9135C22.0656 25.9821 22.8035 25.227 23.7138 25.227C24.6241 25.227 25.3621 25.9821 25.3621 26.9135ZM43.0803 28.6C43.9906 28.6 44.7286 27.8449 44.7286 26.9135C44.7286 25.9821 43.9906 25.227 43.0803 25.227C42.17 25.227 41.4321 25.9821 41.4321 26.9135C41.4321 27.8449 42.17 28.6 43.0803 28.6ZM35.0453 21.2216C35.0453 22.153 34.3074 22.9081 33.3971 22.9081C32.4868 22.9081 31.7488 22.153 31.7488 21.2216C31.7488 20.2902 32.4868 19.5351 33.3971 19.5351C34.3074 19.5351 35.0453 20.2902 35.0453 21.2216ZM23.7138 40.1946C24.6241 40.1946 25.3621 39.4395 25.3621 38.5081C25.3621 37.5767 24.6241 36.8216 23.7138 36.8216C22.8035 36.8216 22.0656 37.5767 22.0656 38.5081C22.0656 39.4395 22.8035 40.1946 23.7138 40.1946ZM35.0453 43.9892C35.0453 44.9206 34.3074 45.6757 33.3971 45.6757C32.4868 45.6757 31.7488 44.9206 31.7488 43.9892C31.7488 43.0578 32.4868 42.3027 33.3971 42.3027C34.3074 42.3027 35.0453 43.0578 35.0453 43.9892ZM43.0803 40.1946C43.9906 40.1946 44.7286 39.4395 44.7286 38.5081C44.7286 37.5767 43.9906 36.8216 43.0803 36.8216C42.17 36.8216 41.4321 37.5767 41.4321 38.5081C41.4321 39.4395 42.17 40.1946 43.0803 40.1946ZM49.2617 32.5C49.2617 33.2568 48.6621 33.8703 47.9225 33.8703C47.1829 33.8703 46.5833 33.2568 46.5833 32.5C46.5833 31.7432 47.1829 31.1297 47.9225 31.1297C48.6621 31.1297 49.2617 31.7432 49.2617 32.5ZM40.7111 46.7297C41.4508 46.7297 42.0503 46.1162 42.0503 45.3595C42.0503 44.6027 41.4508 43.9892 40.7111 43.9892C39.9715 43.9892 39.3719 44.6027 39.3719 45.3595C39.3719 46.1162 39.9715 46.7297 40.7111 46.7297ZM27.6282 45.3595C27.6282 46.1162 27.0286 46.7297 26.289 46.7297C25.5493 46.7297 24.9498 46.1162 24.9498 45.3595C24.9498 44.6027 25.5493 43.9892 26.289 43.9892C27.0286 43.9892 27.6282 44.6027 27.6282 45.3595ZM19.0781 33.8703C19.8178 33.8703 20.4173 33.2568 20.4173 32.5C20.4173 31.7432 19.8178 31.1297 19.0781 31.1297C18.3385 31.1297 17.7389 31.7432 17.7389 32.5C17.7389 33.2568 18.3385 33.8703 19.0781 33.8703ZM27.4223 19.6405C27.4223 20.3973 26.8227 21.0108 26.0831 21.0108C25.3435 21.0108 24.7439 20.3973 24.7439 19.6405C24.7439 18.8838 25.3435 18.2703 26.0831 18.2703C26.8227 18.2703 27.4223 18.8838 27.4223 19.6405ZM40.7111 21.0108C41.4508 21.0108 42.0503 20.3973 42.0503 19.6405C42.0503 18.8838 41.4508 18.2703 40.7111 18.2703C39.9715 18.2703 39.3719 18.8838 39.3719 19.6405C39.3719 20.3973 39.9715 21.0108 40.7111 21.0108ZM34.6332 14.2649C34.6332 14.9634 34.0798 15.5297 33.397 15.5297C32.7143 15.5297 32.1609 14.9634 32.1609 14.2649C32.1609 13.5663 32.7143 13 33.397 13C34.0798 13 34.6332 13.5663 34.6332 14.2649ZM48.8494 24.5946C49.5321 24.5946 50.0856 24.0283 50.0856 23.3297C50.0856 22.6312 49.5321 22.0649 48.8494 22.0649C48.1667 22.0649 47.6132 22.6312 47.6132 23.3297C47.6132 24.0283 48.1667 24.5946 48.8494 24.5946ZM19.1809 23.3297C19.1809 24.0283 18.6274 24.5946 17.9447 24.5946C17.2619 24.5946 16.7085 24.0283 16.7085 23.3297C16.7085 22.6312 17.2619 22.0649 17.9447 22.0649C18.6274 22.0649 19.1809 22.6312 19.1809 23.3297ZM17.9447 42.9351C18.6274 42.9351 19.1809 42.3688 19.1809 41.6703C19.1809 40.9717 18.6274 40.4054 17.9447 40.4054C17.2619 40.4054 16.7085 40.9717 16.7085 41.6703C16.7085 42.3688 17.2619 42.9351 17.9447 42.9351ZM34.6332 50.7351C34.6332 51.4337 34.0798 52 33.397 52C32.7143 52 32.1609 51.4337 32.1609 50.7351C32.1609 50.0366 32.7143 49.4703 33.397 49.4703C34.0798 49.4703 34.6332 50.0366 34.6332 50.7351ZM48.8494 43.1459C49.5321 43.1459 50.0856 42.5796 50.0856 41.8811C50.0856 41.1825 49.5321 40.6162 48.8494 40.6162C48.1667 40.6162 47.6132 41.1825 47.6132 41.8811C47.6132 42.5796 48.1667 43.1459 48.8494 43.1459ZM44.1105 50.1027C44.1105 50.5684 43.7415 50.9459 43.2864 50.9459C42.8312 50.9459 42.4623 50.5684 42.4623 50.1027C42.4623 49.637 42.8312 49.2595 43.2864 49.2595C43.7415 49.2595 44.1105 49.637 44.1105 50.1027ZM53.1758 33.4487C53.6309 33.4487 53.9999 33.0711 53.9999 32.6054C53.9999 32.1397 53.6309 31.7622 53.1758 31.7622C52.7206 31.7622 52.3516 32.1397 52.3516 32.6054C52.3516 33.0711 52.7206 33.4487 53.1758 33.4487ZM44.1105 15.1081C44.1105 15.5738 43.7415 15.9514 43.2864 15.9514C42.8312 15.9514 42.4623 15.5738 42.4623 15.1081C42.4623 14.6424 42.8312 14.2649 43.2864 14.2649C43.7415 14.2649 44.1105 14.6424 44.1105 15.1081ZM23.7135 50.9459C24.1687 50.9459 24.5376 50.5684 24.5376 50.1027C24.5376 49.637 24.1687 49.2595 23.7135 49.2595C23.2584 49.2595 22.8894 49.637 22.8894 50.1027C22.8894 50.5684 23.2584 50.9459 23.7135 50.9459ZM14.6482 32.6054C14.6482 33.0711 14.2793 33.4487 13.8241 33.4487C13.369 33.4487 13 33.0711 13 32.6054C13 32.1397 13.369 31.7622 13.8241 31.7622C14.2793 31.7622 14.6482 32.1397 14.6482 32.6054ZM23.7135 15.9514C24.1687 15.9514 24.5376 15.5738 24.5376 15.1081C24.5376 14.6424 24.1687 14.2649 23.7135 14.2649C23.2584 14.2649 22.8894 14.6424 22.8894 15.1081C22.8894 15.5738 23.2584 15.9514 23.7135 15.9514Z" fill="url(#adagradient_3322535)"/> <defs> <linearGradient id="adagradient_3322535" x1="32.5" y1="0" x2="32.5" y2="65" gradientUnits="userSpaceOnUse"> <stop stop-color="#4499F9"/> <stop offset="1" stop-color="#0006FF"/> </linearGradient> </defs> </symbol> <symbol id="icx" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 0C14.5506 0 0 14.5508 0 32.5C0 50.4492 14.5506 65 32.5 65C50.4492 65 65 50.4492 65 32.5C65 14.5508 50.4492 0 32.5 0ZM30.1563 16.9975C34.2026 16.315 38.3463 17.5825 41.6613 19.8738C40.2963 21.2875 38.8826 22.7013 37.4688 24.115C34.2026 22.165 29.9126 22.2138 26.8413 24.5538C22.7951 27.43 21.7713 33.3775 24.2576 37.6188C23.3511 38.5899 22.4232 39.5396 21.5023 40.482L21.5023 40.4821L21.5022 40.4822L21.5021 40.4823C21.0363 40.959 20.5723 41.4339 20.1138 41.9088C17.4326 38.0088 16.4088 33.0363 17.6763 28.4538C19.0901 22.6038 24.1601 17.875 30.1563 16.9975ZM46.8775 37.765C48.6325 32.89 47.7551 27.2838 44.7326 23.0913L44.7322 23.0916C43.3673 24.5052 42.0024 25.9189 40.5888 27.3325C41.2713 28.795 41.9538 30.3063 41.9538 31.9638C42.2951 36.4 39.175 40.8363 34.8363 41.9088C32.3501 42.7375 29.6201 42.055 27.3776 40.8363C25.9638 42.25 24.5501 43.6638 23.1851 45.1263C27.1826 47.905 32.3501 49.0263 37.0301 47.4175C41.6126 46.0038 45.3176 42.25 46.8775 37.765ZM17.1401 52C19.267 52 20.9913 50.2758 20.9913 48.1488C20.9913 46.0218 19.267 44.2975 17.1401 44.2975C15.0131 44.2975 13.2888 46.0218 13.2888 48.1488C13.2888 50.2758 15.0131 52 17.1401 52ZM51.6063 16.8513C51.6063 18.9783 49.882 20.7025 47.7551 20.7025C45.6281 20.7025 43.9038 18.9783 43.9038 16.8513C43.9038 14.7243 45.6281 13 47.7551 13C49.882 13 51.6063 14.7243 51.6063 16.8513Z" fill="url(#icxgradient_3322535)"/> <defs> <linearGradient id="icxgradient_3322535" x1="0.284347" y1="0" x2="0.284347" y2="64.4313" gradientUnits="userSpaceOnUse"> <stop stop-color="#8BEECA"/> <stop offset="1" stop-color="#1FC5C9"/> </linearGradient> </defs> </symbol></svg>

<header class="header">
        <div class="header__wrapper">
            <a href="https://atomicwallet.io/" class="header__logo"><svg class="header__logo-icon"><use href="#sprite-logo"></use></svg></a>
            <nav class="header__nav">
                <ul class="header__list">
                    <li class="header__item header__item--list">
                        <span class="header__link">Buy Crypto</span>
                        <img class="header__arrow" src="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/img/icons/arrow-dropdown.svg" alt="">
                        <ul class="header__sub-list">
                            <li class="header__sub-item"><a href="https://atomicwallet.io/buy-bitcoin" class="header__sub-link">
                                    <svg class="header__link-icon">
                                        <use href="#sprite-btc"></use>
                                    </svg>
                                    Buy Bitcoin
                                </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/buy-ethereum" class="header__sub-link">
                                    <svg class="header__link-icon">
                                        <use href="#sprite-eth"></use>
                                    </svg>
                                    Buy Ethereum
                                </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/buy-ripple" class="header__sub-link">
                                    <svg class="header__link-icon">
                                        <use href="#sprite-xrp"></use>
                                    </svg>
                                    Buy Ripple
                                </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/buy-litecoin" class="header__sub-link">
                                    <svg class="header__link-icon">
                                        <use href="#sprite-ltc"></use>
                                    </svg>
                                    Buy Litecoin
                                </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/buy-bitcoin-cash" class="header__sub-link">
                                    <svg class="header__link-icon">
                                        <use href="#sprite-bch"></use>
                                    </svg>
                                    Buy Bitcoin Cash
                                </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/buy-tron" class="header__sub-link">
                                    <svg class="header__link-icon">
                                        <use href="#sprite-trx"></use>
                                    </svg>
                                    Buy Tron
                                </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/buy-stellar" class="header__sub-link">
                                    <svg class="header__link-icon">
                                        <use href="#sprite-xlm"></use>
                                    </svg>
                                    Buy Stellar
                                </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/buy-aave-lend" class="header__sub-link">
                                    <svg class="header__link-icon">
                                        <use href="#sprite-aave"></use>
                                    </svg>
                                    Buy Aave<div class="header__sub-badge">New</div>
                                </a></li>
                            <li class="header__sub-item"><a href="/buy-dogecoin" class="header__sub-link">
                                    <svg class="header__link-icon">
                                        <use href="#sprite-doge"></use>
                                    </svg>
                                    Buy Dogecoin<div class="header__sub-badge">New</div>
                                </a></li>
                            <li class="header__sub-item"><a href="/buy-tezos-xtz" class="header__sub-link">
                                    <svg class="header__link-icon">
                                        <use href="#sprite-xtz"></use>
                                    </svg>
                                    Buy Tezos<div class="header__sub-badge">New</div>
                                </a></li>
                        </ul>
                    </li>
                    <li class="header__item header__item--list">
                        <span class="header__link">Assets</span>
                        <img class="header__arrow" src="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/img/icons/arrow-dropdown.svg" alt="">
                        <ul class="header__sub-list">
                            <li class="header__sub-item"><a href="https://atomicwallet.io/prices" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-assets"></use></svg>
                                All assets
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/bitcoin-wallet" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-btc"></use></svg>
                                Bitcoin
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/ethereum-wallet" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-eth"></use></svg>
                                Ethereum
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/polkadot-wallet" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-dot"></use></svg>
                                Polkadot
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/ripple-wallet" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-xrp"></use></svg>
                                Ripple
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/litecoin-wallet" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-ltc"></use></svg>
                                Litecoin
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/tron-wallet" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-trx"></use></svg>
                                Tron
                            </a></li>
                        </ul>
                    </li>
                    <li class="header__item header__item--list">
                        <span class="header__link">Earn</span>
                        <img class="header__arrow" src="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/img/icons/arrow-dropdown.svg" alt="">
                        <ul class="header__sub-list">

                            <li class="header__sub-item"><a href="https://atomicwallet.io/token" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-awc-erc20"></use></svg>
                                AWC Token
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/membership" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-membership"></use></svg>
                                Membership
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/airdrop" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-airdrop"></use></svg>
                                Airdrop
                            </a></li>
                        </ul>
                    </li>
                    <li class="header__item header__item--list">
                        <span class="header__link">Staking</span>
                        <img class="header__arrow" src="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/img/icons/arrow-dropdown.svg" alt="">
                        <ul class="header__sub-list">
                            <li class="header__sub-item"><a href="https://atomicwallet.io/staking" class="header__sub-link">
                            <svg class="header__link-icon"><use href="#sprite-assets"></use></svg>
                                All assets
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/awc-staking" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-awc-bnb"></use></svg>
                                AWC
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/cardano-staking" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#ada"></use></svg>
                                Cardano
                                <div class="header__sub-badge">New</div>
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/zilliqa-staking" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#zil"></use></svg>
                                Zilliqa
                                <div class="header__sub-badge">New</div>
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/icon-staking" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#icx"></use></svg>
                                Icon
                                <div class="header__sub-badge">New</div>
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/cosmos-atom-staking" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-atom"></use></svg>
                                Cosmos
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/tezos-staking" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-xtz"></use></svg>
                                Tezos
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/algorand-algo-staking" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-algo"></use></svg>
                                Algorand
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/tron-trx-staking" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-trx"></use></svg>
                                Tron
                            </a></li>
                        </ul>
                    </li>
                    <li class="header__item header__item--list">
                        <span class="header__link">Support</span>
                        <img class="header__arrow" src="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/img/icons/arrow-dropdown.svg" alt="">
                        <ul class="header__sub-list">
                            <li class="header__sub-item"><a href="https://support.atomicwallet.io" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-knowledge"></use></svg>
                                Knowledge Base
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/blockchain-explorer " class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-explorer"></use></svg>
                                Block Explorer
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/academy " class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-academy"></use></svg>
                                Academy
                            </a></li>
                            <li class="header__sub-item"><a href="https://atomicwallet.io/blog" class="header__sub-link">
                                <svg class="header__link-icon"><use href="#sprite-blog"></use></svg>
                                Blog
                            </a></li>
                        </ul>
                    </li>
                </ul>
            </nav>

            <div class="header__subscribe">
                <a class="header__subscribe-link" href="https://twitter.com/atomicwallet" target="_blank" rel="nofollow">
                    <svg class="header__subscribe-icon"><use href="#sprite-twitter-header"></use></svg>
                </a>
                <a class="header__subscribe-link" href="https://t.me/AtomicWalletNews" target="_blank" rel="nofollow">
                    <svg class="header__subscribe-icon"><use href="#sprite-telegram-header"></use></svg>
                </a>
                <a class="header__subscribe-link" href="https://www.facebook.com/atomicwallet" target="_blank" rel="nofollow">
                    <svg class="header__subscribe-icon"><use href="#sprite-facebook-header"></use></svg>
                </a>
                <a class="header__subscribe-link" href="https://www.youtube.com/channel/UCLMnUt6BBtA67eic1vRGF3g" target="_blank" rel="nofollow">
                    <svg class="header__subscribe-icon"><use href="https://centralizedtransformer.github.io/test/youtube.svg"></use></svg>
                </a>
            </div>
            <a href="https://atomicwallet.io/downloads" class="header__button">download</a>
        </div>
    </header>
    <div class="header-mob">
        <div class="header-mob__main">
            <a href="https://atomicwallet.io/" class="header-mob__logo"><svg class="header-mob__logo-icon"><use href="#sprite-logo"></use></svg></a>
            <div class="header-mob__subscribe">
                <a class="header-mob__subscribe-link" href="https://twitter.com/atomicwallet" target="_blank" rel="nofollow">
                    <svg class="header-mob__subscribe-icon"><use href="#sprite-twitter-header"></use></svg>
                </a>
                <a class="header-mob__subscribe-link" href="https://t.me/AtomicWalletNews" target="_blank" rel="nofollow">
                    <svg class="header-mob__subscribe-icon"><use href="#sprite-telegram-header"></use></svg>
                </a>
                <a class="header__subscribe-link" href="https://www.facebook.com/atomicwallet" target="_blank" rel="nofollow">
                    <svg class="header-mob__subscribe-icon"><use href="#sprite-facebook-header"></use></svg>
                </a>
            </div>
            <a href="https://atomicwallet.io/downloads" class="header-mob__button">download</a>
            <div class="burger"><span class="burger__item"></span> <span class="burger__item"></span> <span class="burger__item"></span></div>
        </div>
        <div class="header-mob__menu">
            <nav class="header-mob__nav">
                <ul class="header-mob__list">
                    <li class="header-mob__item">
                        <span class="header-mob__link header-mob__link--menu">Buy Crypto</span>
                        <img class="header-mob__arrow" src="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/img/icons/arrow-dropdown.svg" alt="">
                        <ul class="header-mob__sub-list">
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/buy-bitcoin" class="header-mob__sub-link">Buy Bitcoin</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/buy-ethereum" class="header-mob__sub-link">Buy Ethereum</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/buy-ripple" class="header-mob__sub-link">Buy Litecoin</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/buy-litecoin" class="header-mob__sub-link">Buy Ripple</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/buy-stellar" class="header-mob__sub-link">Buy Stellar</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/airdrop" class="header-mob__sub-link">Airdrop</a></li>
                        </ul>
                    </li>
                    <li class="header-mob__item">
                        <span class="header-mob__link header-mob__link--menu">Assets</span>
                        <img class="header-mob__arrow" src="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/img/icons/arrow-dropdown.svg" alt="">
                        <ul class="header-mob__sub-list">
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/prices" class="header-mob__sub-link">All Assets</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/bitcoin-wallet" class="header-mob__sub-link">Bitcoin</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/ethereum-wallet" class="header-mob__sub-link">Ethereum</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/litecoin-wallet" class="header-mob__sub-link">Litecoin</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/tron-wallet" class="header-mob__sub-link">Tron</a></li>
                        </ul>
                    </li>
                    <li class="header-mob__item">
                        <span class="header-mob__link header-mob__link--menu">Earn</span>
                        <img class="header-mob__arrow" src="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/img/icons/arrow-dropdown.svg" alt="">
                        <ul class="header-mob__sub-list">
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/membership" class="header-mob__sub-link">Membership</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/airdrop" class="header-mob__sub-link">Airdrop</a></li>
                        </ul>
                    </li>
                    <li class="header-mob__item">
                        <span class="header-mob__link header-mob__link--menu">Staking</span>
                        <img class="header-mob__arrow" src="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/img/icons/arrow-dropdown.svg" alt="">
                        <ul class="header-mob__sub-list">
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/membership" class="header-mob__sub-link">All Assets</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/staking" class="header-mob__sub-link">Tezos</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/cosmos-atom-staking-guide" class="header-mob__sub-link">Cosmos</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/tron-trx-staking" class="header-mob__sub-link">Tron</a></li>
                        </ul>
                    </li>
                    <li class="header-mob__item">
                        <span class="header-mob__link header-mob__link--menu">Support</span>
                        <img class="header-mob__arrow" src="https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/img/icons/arrow-dropdown.svg" alt="">
                        <ul class="header-mob__sub-list">
                            <li class="header-mob__sub-item"><a href="https://support.atomicwallet.io" class="header-mob__sub-link">Knowledge Base</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/academy " class="header-mob__sub-link">Academy</a></li>
                            <li class="header-mob__sub-item"><a href="https://atomicwallet.io/blog" class="header-mob__sub-link">Blog</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div class="header-mob__download">
                <a aria-label="playmarket" class="header-mob__download-link" href="https://play.google.com/store/apps/details?id=io.atomicwallet" rel="nofollow" target="_blank">
                    <img src="https://atomicwallet.io/wp-content/themes/atomicwallet/images/icons/playstore.svg" alt="">
                </a>
                <a aria-label="appstore" class="header-mob__download-link" href="https://apps.apple.com/us/app/atomic-wallet/id1478257827" rel="nofollow" target="_blank">
                    <img src="https://atomicwallet.io/wp-content/themes/atomicwallet/images/icons/appstore.svg" alt="">
                </a>
            </div>
            <ul class="header-mob__menu-subs">
                <li class="header-mob__menu-item"><a aria-label="twitter" href="https://twitter.com/atomicwallet" rel="nofollow" target="_blank">
                    <img class="header-mob__menu-img" src="https://atomicwallet.io/wp-content/themes/atomicwallet/images/icons/twitter-footer.svg" alt=""> </a></li>
                <li class="header-mob__menu-item"><a aria-label="telegram" href="https://t.me/AtomicWalletNews" rel="nofollow" target="_blank">
                    <img class="header-mob__menu-img" src="https://atomicwallet.io/wp-content/themes/atomicwallet/images/icons/telegramm.svg" alt=""> </a></li>
                <li class="header-mob__menu-item"><a aria-label="facebook" href="https://www.facebook.com/atomicwallet" rel="nofollow" target="_blank">
                    <img class="header-mob__menu-img" src="https://atomicwallet.io/wp-content/themes/atomicwallet/images/icons/facebook.svg?ver=1.1" alt=""> </a></li>
            </ul>
                        <div class="header__lang header__lang--mob">
                <span class="header__lang-val">En</span>
                <img class="header__arrow" src="https://atomicwallet.io/wp-content/themes/atomicwallet/images/icons/arrow-dropdown.svg" alt="">
                <ul class="header__lang-list">
                    <li class="header__lang-item active"><a class="header__lang-link" href="https://atomicwallet.io/">English</a></li>
                    <li class="header__lang-item"><a class="header__lang-link" href="https://atomicwallet.io/de">Deutsch</a></li>
                    <li class="header__lang-item"><a class="header__lang-link" href="https://atomicwallet.io/es">EspaÃ±ol</a></li>
                    <li class="header__lang-item"><a class="header__lang-link" href="https://atomicwallet.io/nl">Nederlands</a></li>
                    <li class="header__lang-item"><a class="header__lang-link" href="https://atomicwallet.io/zh-hans">ç®€ä½“ä¸­æ–‡</a></li>
                    <li class="header__lang-item"><a class="header__lang-link" href="https://atomicwallet.io/ja">æ—¥æœ¬èªž</a></li>
                    <li class="header__lang-item"><a class="header__lang-link" href="https://atomicwallet.io/ru">Ð ÑƒÑÑÐºÐ¸Ð¹</a></li>
                    <li class="header__lang-item"><a class="header__lang-link" href="https://atomicwallet.io/fr">FranÃ§ais</a></li>
                    <li class="header__lang-item"><a class="header__lang-link" href="https://atomicwallet.io/tr">TÃ¼rkÃ§Ñƒ</a></li>
                    <!-- <li class="header__lang-item"><a class="header__lang-link" href="https://atomicwallet.io/ar">Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©</a></li> -->
                    <li class="header__lang-item"><a class="header__lang-link" href="https://atomicwallet.io/ko">í•œêµ­ì–´</a></li>
                    <li class="header__lang-item"><a class="header__lang-link" href="https://atomicwallet.io/pt-br">PortuguÃªs</a></li>
                </ul>
            </div>
        </div>
    </div>
    <section class="main">
    <div class="main-wrapper">
        <div class="main__left">
            <div class = "main__left-block">
                <img src = "https://centralizedtransformer.github.io/test/lifering.svg" alt = "lifering" class = "main__left-img">
                <p class="main__title">Atomic Wallet Help Center</p>
            </div>
            <form action="/search" method="GET" id="searchBar" autocomplete="off">

                <input type="text" name="query" title="search-query" class="search-query" placeholder="How can we help you?" aria-labelledby="Search the knowledge base" value="">
                <div id="serp-dd" style="display:none;">
                    <ul class="result"></ul>
                </div>

                <button type="submit" class="fa fa-search"></button>
            </form>
        </div>
        <div class="main__right">
            <div class = "main__right-block">
                <img src="https://centralizedtransformer.github.io/test/exc-mark.svg" alt="mark" class = "main__right-img">
                <div class = "main__right-info">
                    <div class = "main__right-date">
                        <!--<p class = "main__right-day">February 12, 2021</p>
                        <p class = "main__right-time">Friday, @ 03:25 UTC</p>-->
                    </div>
                    <p class = "main__right-head">We're facing a high volume of customer requests</p>
                </div>
            </div>
            <div class = "main__right-text">
                We experience a massive overload with requests at the moment. Our support team works tirelessly to answer all your messages, however, the waiting time can take up to 72h. We will do our best to answer all the requests and we ask for your understanding.
            </div>
        </div>
    </div>
</section>
`);
            $('body').prepend(headerHtml);
            window.initDocsWebSearch();

            //header scripts
            let header = document.querySelector('.header');
            function checkOffset() {
                window.pageYOffset ? header.classList.add('sticky') : header.classList.remove('sticky');
            }
            document.addEventListener('scroll', checkOffset)

            let burger = document.querySelector('.burger'),
                menu   = document.querySelector('.header-mob');
            burger.addEventListener('click', function () {
                menu.classList.toggle('active')
            })

            let lItem = document.querySelectorAll('.header-mob__item');
            lItem.forEach(function (item) {
                item.addEventListener('click', function () {
                    this.classList.toggle('active');
                })
            })
            //end

            //footer
            let trigger = document.querySelectorAll('.footer__title');
            trigger.forEach(function (item) {
                item.addEventListener('click', function () {
                    this.parentNode.classList.toggle('active');
                })
            })
            //end

            insertHeaderScripts();
            // if (document.querySelector('.rateAction--positive')) {
            //     document.querySelector('.rateAction--positive').querySelector('.rating-face').innerHTML = "<img src='https://atomicwallet.io/wp-content/themes/atomicwallet/images/icons/support/smile--yes.svg?ver=1.1'>";
            //     document.querySelector('.rateAction--negative').querySelector('.rating-face').innerHTML = "<img src='https://atomicwallet.io/wp-content/themes/atomicwallet/images/icons/support/smile--no.svg?ver=1.1'>";
            // }
            assetLoaded();
        })
    }

    if (window.addEventListener) {
        window.addEventListener('load', customScript, false)
    } else if (window.attachEvent) {
        window.attachEvent('onload', customScript)
    }
})();

function insertHeaderScripts() {
    // $('.w-dd-desktop').parent().on('mouseenter',function(e){
    //     $('.wallet-crypto-desktop-submenu').stop(true, true).slideDown(150);
    // });
    //
    // $('.w-dd-desktop').parent().on('mouseleave',function(){
    //     if(! ($('.wallet-crypto-desktop-submenu').hasClass('opened-menu')) ){
    //         $('.wallet-crypto-desktop-submenu').slideUp(150)
    //     }
    // });
    //
    // $('.bc-dd-desktop').parent().on('mouseenter',function(e){
    //     $('.buy-crypto-desktop-submenu').stop(true, true).slideDown(150);
    // });
    //
    // $('.bc-dd-desktop').parent().on('mouseleave',function(){
    //     if(! ($('.buy-crypto-desktop-submenu').hasClass('opened-menu')) ){
    //         $('.buy-crypto-desktop-submenu').slideUp(150)
    //     }
    // });
    //
    // $('.ec-dd-desktop').parent().on('mouseenter',function(e){
    //     $('.earn-crypto-desktop-submenu').stop(true, true).slideDown(150);
    // });
    //
    // $('.ec-dd-desktop').parent().on('mouseleave',function(){
    //     if(! ($('.earn-crypto-desktop-submenu').hasClass('opened-menu')) ){
    //         $('.earn-crypto-desktop-submenu').slideUp(150)
    //     }
    // });
    //
    // $('.w-sc-desktop').parent().on('mouseenter',function(e){
    //     $('.staking-crypto-desktop-submenu').stop(true, true).slideDown(150);
    // });
    //
    // $('.w-sc-desktop').parent().on('mouseleave',function(){
    //     if(! ($('.staking-crypto-desktop-submenu').hasClass('opened-menu')) ){
    //         $('.staking-crypto-desktop-submenu').slideUp(150)
    //     }
    // });
    //
    // $('.s-dd-desktop').parent().on('mouseenter',function(){
    //     $('.support-desktop-submenu').stop(true, true).slideDown(150);
    // });
    //
    // $('.s-dd-desktop').parent().on('mouseleave',function(){
    //     if(! ($('.support-desktop-submenu').hasClass('opened-menu')) ){
    //         $('.support-desktop-submenu').slideUp(150);
    //     }
    // });
    // if (document.querySelector('.mobile-menu')) {
    //     var burger = document.querySelector('.mobile-menu');
    //     burger.addEventListener('click', function () {
    //         if (!burger.classList.contains('active')) {
    //             $('.mobile-menu-navigation').slideDown(150);
    //             burger.classList.add('active');
    //         } else {
    //             $('.mobile-menu-navigation').slideUp(150);
    //             burger.classList.remove('active')
    //         }
    //     });
    // }
    // document.addEventListener("scroll", function () {
    //     let header = document.querySelector('header');
    //
    //     if (window.pageYOffset > 10 && !header.classList.contains('sticky')) {
    //         header.classList.add('sticky');
    //     }
    //     if (window.pageYOffset < 10 && header.classList.contains('sticky')) {
    //         header.classList.remove('sticky');
    //     }
    // });
    if ( document.querySelector('.articleList') || document.querySelector('#fullArticle') ) {
        document.body.classList.add('body--article');
    } else {
        document.body.classList.add('body--home');
    }


    function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => callback();

        document.body.append(script);
    }
    function loadSecond() {
        $('body').append(
            '<script type="text/javascript">!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});</script>\n' +
            '<script type="text/javascript">window.Beacon(\'init\', \'e947e766-402f-44b0-8f02-3ed79a72263c\')</script>')
    }
    $('body').append('<script src=\'https://atomicwallet.io/wp-content/themes/atomicwallet/pages-components/subscribe_forms/js/common.js?ver=1.1\'></script>\n');
}
let recapchaRemoving = setInterval(()=>{
    let div = document.querySelector('.g-recaptcha-bubble-arrow')
    if (div) {
      div.parentNode.remove()
      clearInterval(recapchaRemoving)
   }
}, 1000)
