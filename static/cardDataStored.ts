import CardData from './cardInterface';

const cardsData: CardData[] = [
  // Basic Needs
  {
    id: 1,
    uid: 'bn1',
    backgroundColor: 'red',
    text: 'Treba mi voda',
    title: 'Voda',
    image:
      'data:image/jpeg;base64,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',
    width: 1,
    category: 'Basic Needs',
  },
  {
    id: 2,
    uid: 'bn2',
    backgroundColor: 'red',
    text: 'Želim jesti',
    title: 'Jesti',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?resize=768,574',
    width: 1,
    category: 'Basic Needs',
  },
  {
    id: 3,
    uid: 'bn3',
    backgroundColor: 'red',
    text: 'Umoran sam',
    title: 'Umor',
    image:
      'https://media.istockphoto.com/id/1205852013/photo/home-office.jpg?s=612x612&w=0&k=20&c=xs9YYJXY9o5nqp15WCv4Vzs06HohDr0aM02yTp_IzXE=',
    width: 1,
    category: 'Basic Needs',
  },

  // Feelings and Emotions
  {
    id: 4,
    uid: 'fe1',
    backgroundColor: 'purple',
    text: 'Osjećam se sretno danas',
    title: 'Sretan',
    image: 'https://www.theladders.com/wp-content/uploads/happy-190806.jpg',
    width: 1,
    category: 'Feelings and Emotions',
  },
  {
    id: 5,
    uid: 'fe2',
    backgroundColor: 'purple',
    text: 'Veoma sam tužan',
    title: 'Tužan',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvV6_a0SPANHyo5ddbRpCVLeiPj7LJUsRigg&s',
    width: 1,
    category: 'Feelings and Emotions',
  },
  {
    id: 6,
    uid: 'fe3',
    backgroundColor: 'purple',
    text: 'Tako sam uzbuđen',
    title: 'Uzbuđen',
    image:
      'data:image/jpeg;base64,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',
    width: 1,
    category: 'Feelings and Emotions',
  },

  // People
  {
    id: 7,
    uid: 'p1',
    backgroundColor: 'green',
    text: 'Ovo je moj prijatelj',
    title: 'Prijatelj',
    image:
      'https://simonsinek.com/wp-content/uploads/2024/02/WebsiteImage_MasteringHelp_LOC.jpg',
    width: 1,
    category: 'People',
  },
  {
    id: 8,
    uid: 'p2',
    backgroundColor: 'green',
    text: 'Želim svoju majku',
    title: 'Majka',
    image:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExIVFRUSFxUVFRUVFRUVFRUVFRUWFhUWFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGC0lHSUtLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAK0BIwMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EAEQQAAEDAgQDBgMFBQUHBQAAAAEAAgMEEQUSITFBUWEGEyJxgZGhscEjMkJS8AdictHhFDNTgpIVFnOisuLxJENjwtL/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAjEQACAgMBAQACAgMAAAAAAAAAAQIRAyExEkEiURNhBDJC/9oADAMBAAIRAxEAPwBvSxJtBEtU9GeSYw0x5KRZgEkKFkhTuSnQU0KwLEs7EI6C6duplr+zIMYUMpFM2JHmFcFiUIO1ilY1dZV20IGMY1TMahpqyOP772tt+ZwHzSuo7ZUjNnOf/A0kH1NgiCixNapA1V3D+2FNKbXcz+IAD1sdE6o8RikNmPa472BG3kiAKDV2Aug1dBqNANtCkAWMapLLAOQEPV7IPEu0lJAbSTtDh+Fvjd5ZW3t6pJV9uYHfchmcPzFrWD3JQYVFsPnZddwtVeHaumf+PKeTh9RomtFiDHHwva7yIKVug+WGTNUAYu5ZgoZJhcdUbBRDiMWiFibZGV5Nknkq0Ew0PmEEKOSNAw1myNnJtdByoKjZ2TouGS2NkDPUIWnqruRTsDVDmpF2rjAZ+7eM3NF0UeZq6lw/YpkD4XmGoaRvoVUu0E4Mlm8N1lO2RosHGy0aI3udSU12BKhdC0qYO1TBlIuDSrBBO6WI4RLEAjmOnCJZCoo5VO2RMKRSxIKaIJjIUBUFYwE8BDSFTSuQr3JGx0iN5ULl24oDFcRZBGZJDYD3J4AdSlCaxLEooGZ5HhoHuTyA4lUzEe27pL900sYDq8nxu5NaPw+arGO4q+pm7x33RfK2+jBfQAfM8VHizhHGwNcNWZncSXuI362N/KydQB6N1+NPJNsovrcWLvVxufil7a2Zx0e//UV1JBYN2uTr0urXhOAsDQ77zjsbggLTlGCGhGU2CYfG94+1FxbQ7PHkf5pxhtC+NwfE4hw4na3IhMqHCgDmKYaALklld6O1Yo1stGDV/et8QAeNwDceY6JmGqlUFb3cjXcAdeo4q8sAIBBuCLg8wdlfFP0jjzY/D0aAVNqq+bEHuZA8xUrCWulb9+Zw3DOTevz2U/7S8XdDTNhi/vqtwhZz8RAPzA9U0wbDWQwshZY920A9TxJ6k3KOSTS0bFFPbF9B2dpoR4Ihfi53icfNxUtZRMLSCBYppPZjczjYDikkmNUxNu9APIg/yXK1I600UDtX2cMd5Ir23I5f0VYpq17HBzXFrm7EfVexy5Ht0IcOhBC8z7XYGYXd4wfZuO35Sfor4sl/jIllhX5RHWHdr84DZBldsSNvbgrDhkhdIL8jZeTRuv6K7diMcGZsMm/4Hf8A1KeUaWiK2XqpZoqhjILZLDiLq7VG2yrtbR5339EkU0wSkqFWFykyMB5q4FmiTx4ZlcHW2T2nabc0MkW2HHJJFfr4CHFQUUJzEqw1tNmN+i6paIBNGLoDmgrBm6J2INEFh8ICcxt0VkiVg0cKkMQRAYtliNAsE7tRujRhYo3NRaMBFixEFixKNZxFIi43pRBIj4XIIzDXHRLatyPJ0SqucizIDlehnuW5HodzkjHOiVR/2oynuo266uJNujfjurqCqN+1FhLIja4BdbzNv5LR6Z8KFA7M0c7e6gndmeATxzcNuGgWoZrB22hFr6eoHG3LqpMPgMjnZbaaj+iu3WyaVkx8RA/V1eOzURDLl2gGl999t1UIqB99uP8AVej4HhjXtaTvv67a9Vz5pI6cMaGXDohpGAAucbAbk6BPTThjdRtwVLxtwcc07wGjZl7NHnzK5PNs67Co66N98hvZMeweLSd/JHLN4C1xYw2ytLCNAfIk+ireCztdKQweAbHLYHyvupa/BnRSiqaQWxnOARmAcObTpZPB+ZbFyR9xos3a+hbJXQve8gRRjug02PePc4Od6Bo9+iPwuNsL7MJzHe7i7MOeqCq8PFYWVLmZJDG0FuZ+h1JILSLXujH00dM1rMwzuGrnOJJ6XcSQOiac7tpk8eOkk0c4xiYLw15HdkgO8h0UGJYzTRtGWSNv7t2Cw8gVjKJsrspIudbc+o5ow4Y1jbEacrAD4C6mpa2U870V+kropDnY4B3Ei1ndHDisxmmEsbmHZwPumc9JHvkFxxtr7oKZuhQsajx+UFji0/hNlNDOWkOBsQVJ2jA75zhxOvmgmOXoras856bR7b2dxMVNM1/4h4Xjk4b+9wfVGRRC6oP7MK0h8sXBzQ8eYNj8CPZegwnxKTVaFYcYBbZYIbKW62CsAikj0UkIC1K7RRxvRAHwlMYnaJNBImcLtExgprltzlC1y1I5FGOnSqCSdCzzJfPUp6FsZmpWJAaxYh5D6DqeRMoHpLTuTOncpIoxpm0SjEHJkHaJNiLkWBAMjlDdY9y0EhQlaqf+0WhLmskucrbg8mncO9wB7Ky19c2Jhcbm3AWvpqd+l15l2q7SVD3vZmcxou3uxbQcc3NGPQfCqTyWtvpfcfi1vqnvYehdK97g5rWxi73vNmtB0FzzOth0KTTR5hm5DX+ibdj6xrHuida0jo3i/Exl3h9Wvd7KmV/g6NhX5qy4yOjb+V4uPEw3arF2dnuRcW6fVU2pie+VwYNCTlaNBYm+Y89lccNADRwIDeN+Gov0K4W9HouJYp4w8bpPV4DG4/d9eN/NHU8/Vanrg1IwJMTyULYWktGqU41jDzkjbGQx5ax7idbucGmw5AEm/kisVxO9+SrNbXPcL5bBpBJdpsQdB6IwTbKUemPq25iy+VjWDNqQSXDQAj9aJTjNPROA7x2ctFgHXcANtcw1PqusVonuEeXRvexPk5uhsM4B52zBP6irgjZlFKLaCxy3OpJ0AVIrRO64itYZU07HAsIBAs3hYDg0bD0VjrakvjzcuKrOL4eyqIywiItFswOupuTsPIDYJxFGIaYRhxcdruNybcT+uCV1XTPqYt75xcsqGEg+S7sGi53K4MwGqSIWUbFuz5e8kuy36XS/E8BbFGXDO1zQ0kPIIe1xy5hYeEg8Feq2Lvm5cumtzcD0Crfa+qywxxnV7gGnW5DQQ4/ENHqr48km0kSnjgottEf7MWfbuPJh+JH8l6ZCNV57+zuDLnk5uLfQNufiQrvFNqrvpwMe8FgKE73RbZIgKSzmwUTCsnOiiiKJguEptCdEniKaQnRMYnDlqR64zKOZyKMxfVypVUzKetm1SipmViRjpliXOmWIBLTAUzp3JXAmMC5kdDGIdok2IuTXNokmInVFgiCLtqiClYkGKh2+ke1gsco2zaam48JGvn52XnOISXcLknNrc7m+n0Xp3bXDS9ocBcmzW62u8mzASbgC+u3RUaLBJp22a274rgjQG3Ai++xGnIKkHQWIGBtyLm2tlCb3tsQd03iwqQhzu7NowHOPK5a0Anqdh5o3svgrp6pjO7JaDc8ba6X9lT0haLP2UFWWtcYDLbiHZCRb8QOhPVMsVbVtc17KSZrWkl9yx2ltg1jiTzvbgrvBXQQNDGjO5ulm2sPN38roeq7Ru/wG2/jN/wDpXJNY09vZ0wnla0tFXpscjLQQ5CYhjbeaR9sYGmYzRBzA/wC+3k/82mhB59FWZL/mSLGn9L+2uotP9sL3WGxWYqGd2Q5wvbySfCJ2iQtc25sbF2ovw908wbHmwufZjPE9wBMbSQCBpmtcBP8AxbE/n/o9H7PVgmijeNfA0+4TSeEAXyj0H1XkvZftUaacxDWORxLAPwOOuUD8t/ZWTFe1MxBDWkX5lJKPk0X64Oa2pa3QFAPrRxKqT8RlJ5lRPnlPRT8liy1FcCd0BX4hZjiOAPulDM3EoTHanJGfh1KaMbdCydKxn/vSI6UyZLyZo42jN4bZZM5Pq0H1VRqK5873SSG5NrAaBrQdGtHLUpU2QkWJNtTbhc7lWzsFhLJ58rwS1rcxHAm4sD03XYsagrRwyyub3wt/YnDnMpml27i59uQcRb3DfknscBzJnLGGgAWAGlgLDRDRO8SUk3YQYDZdRwlFBdALCg80WijjiRcw0UTEwDTWJjEdEACjY9kQnRcoah+i24oerdoVl0z4IK6XUpRUSoqvk1KVTPXQRInSLagJWIBL5AmMCXQJjAuVHSws7JJiG6dO2SSv3RYEChSNKiXbClGN11DHOwxyC7Ta48jdbpMNijP2cbRoBpyAtc89OKnaUZSwkPivYB7/ABcwBqB/mNh6opWK3Rqk7HwRnwt0frIDc53fvAkg2J201S/Eu7bmgpmNY1vhkewAXPGMHpxPpzQvbDtHUmc00Tu6bYXe377hmc0jN+EeHhrruo4Q2GINaL29yTqSky5KXmJfDhf+0giiobBSVFFdRYZVySXyxmzdySAPII8VltHttwvuPcLlo7PRXa3Crqn452YcbujsDy/Cf5fJepTMa4aJbU0yyk4sLqSpnluG4XnZlkBa9hy9Ry/ialM1QWE2N9TblcaX8tF6dWYYDqNDYi/mLfVUjEezTmkl13DXbb1A1XVDNF9OWeCSegbsfTd7UBx17vxEni46N+pXqbaJrhqFR+yzAxxAAGvBegQ1AyhSyzuRXHDzEXVGCtAJASepprK0VdVZqq1VUklSKIhDbaqldpazPJlGzfmrLjtf3cfU7BUyKNzztck/ErqwR/6Zz/5EteUcRsXq37M8NMcRlcNZSLfwjb43+CEwb9mhbkkqJGvY5oc1sd7G/wCZx16WV8hjDbBoAAsABwAVpSs4+HVbsgKc+JG1xKFiabpRRo1SNKgzGy0JCiYmlOihaVqWU2XDXrAJWlHx/dS+M3TGP7qJiJ6DrnaFGSJbiD9CsuhfCrVztSl8hRlW7UoOQK3ol5ByVi4K2iYv8CYQFLoEwgXKjpYY7ZI686p27ZIsQOqzAgZdNKjBXbSgMNcMhzEk7N+Z2CMqgHNLTpYtsRwtYgjyPxBXDHCKEHieHNzth6CyBrJrENvq2xkPJrgSR6Et0Tom+kWK1EUlnSU4dINA/YA6X4/qyFgqGySNjYxrSTb+7JIte5LjyseK7m8TQ7KSXkgcyB+IkDwtvx5IrAAwB8zQdfs43EWDhu5zelwBfoUsq6Ug3wcOja0WAsB+rpTikXhLrbb+XXomUj9Etr5suu4I16jiFzSOqOisz4m6F4DrmN+rXcWkbtd/P/ym8FY14STFovC5u/dkPaf3TofoVWosRkpp3M1dEfE0cWhwzWaeWpFuiRKy1/svdVDyQT281BSYy2Rt2uv8x5hA1E7yd0PJRMmloW3zNAB6LUbZS4MaMxN7AaHQXO6iinPFPezUQeZnX1a1gH+bMT8h7LUB8Fcj5gGgxu8f3eN9L8NkkqpnBxDmkFu4I1V1oZBLSCRxs6PMx3Jr43FpJ9QtODQ+KXhIAx3k/wC6fR3zR4LZ47VSuqZrN11ytHXif1yVuw7s+yIC+ruJ6pjjnZlsFQKiJtmvNpGjYF2zwOF9j5jqmohGhVMmS0lHhPHjq5S6Hx4w2Kl8d7RG/Mhp3+iKpqoOGZpuDsRrdVftRh8slJIIgCRY72uARcA8+iq9FguIsiDGygNIuWB7hpyuOnIqsJLztnPkx3LSPSqrFYgcpeC78rfE7/S25XVHVMffKdRuCC1w82kXVOwuOvhYRDSxOB1OR1nk8b5je/mn2EYoyRwikifBO0Xa2Tdw4ljxo8c/knsi40Py9c5l2PJdW6Ii0QOctRvU5aucqwCWnKPa7RAwogOTAOnlKMWdZpTUlKMbPhKH0JUaibxFbaLhLJZftD5phSv0KtJaJxeyJ8WqxSOk1WJLY1IukBTCBLoEwgUirC37JHX7p3JskdfusZAqmpG3e0cyB8VAi8MgLngjQNIJPAW+qxmMppA6UAkZYWlzvPf9eSAczMCXnLnPeyk72OrI+lm5bqeZ4iY90pAzvOa53aPus9Rl/wBRSbupam733jhuXO5utyuEwiO5q0TlztRTs8FxoZSP/bb+7zPp5N6iYgsZtlAuBoATwA4AbeiW0jA+WNrRaGMZg0bZW/d/5reeq7dLeQk81z5ZfDpwx+jt79B5JdVjdh/Fq3zRF7hCTuzC2zm7eamy6K5IdQ08pIj6Nuz/AJcqRVtNndGf/jI9i8fRPax95Wm1rnUcnBrr+4I9lxTU9wz/AIQPu0uPxKW6HK3gdIczdx1Hmjq2tEcpife+hB4G/wAk0wSh+4bcUv7X0n/qgeiZO3s3OEffdU47HSAyyscdHR39WuH/AOklxCAmJsjd26O8uBUvZWQtqotdHlzD/maQPjZZKwuZa8Jpf79gee7MgkDRoMzhZ1+P3gT6omviYyKNn5QG24WGilDCzOAOp+SHqdQL+qRsy6ZjNYHNykaObY89dFWm1pAynduh9Exq5L2Syuw90r2ZSADpJrrYcR1I0WX9hQ0o6gOpG2P3gS7XmSSLrUcwUGLVAYGxt0GlgOQUHeeV9/NHbBJXse0sljdSY3Qipi8Phnj+0heNw9uoBtrra3qlNNLxTKmqSCDfqjGTTJSjaGdA8vja7KW5mg2O4uEUGHkmVHEHtDgN1M+n0XalaOBvdCYtXBCnrdFqlbmWMcxxlSthKZRQCy67sJ/ItiwQlJu0As0q1uYLKqdptilaoKdnnUh+0Pmi2PsEHOLPKnvorLhNmnSarFEStLGPSIAmECrcWMNHFTjHWjiuY6vLLNIdEkrmm6G/3gCifi7SsbyyWKBznBo4myeysazK1ouSS1rb2AJFi9x4myhoITYOt43DyytP1UVbmtYHKNRmsS91xbwDh6pkTbNyFkpa5wzGJxFgfxgFpPxPulePVz+4cSACXZQ1t7ZSbN87/VSWLW3jaQ0A2BN767nieK7me0ND3kBlg5zhcgA79SszLpPSRd1AD+JzWj0AP1J+CXE2O67/ANu009mxTMOUWDb5XdPC6xPsh3v1XFN2zugqVDeJ+iGqtdRutQv0Wqg6IDFexR5MjCBqcwP8QY7Kf+pN4I/7w8GtDR8vklkzj30em5dfyAv9E5jbaEni93yQYSTAqfRvTVKe00Gaa/JWjCocrUlxeO8nqt8MnsRRMymx2dwS+hpnB5LfwPzA8rG4Kf1VPoEJXtyQPtoTxRTCXh0wkja9uoeAb+aU1Wl0v/Z5X5oHQO3jJcy/Frjcj0cT7ppiYsmkhVp0V+odugjW5dUbVhVjtBDI4BsdtQSb8QNwlir6UlpE7q/vH5ydNvTmpBIbho3JBafWxH66Ku0dS5htI23TgVZsDoz4ZHfguWjlyuqteRfVjfOALep8h/VTUtz6/Dkl2a5PTf0/rc+yYUoIF/b14lRAXvs3UgtLOQzDyvY/RNpdlT8Hqsk0X7zS0+tyPjZWZ9YF34XcTzs0akJcVOqlwtyGxR99UJQ4k1ptdH6CtFvadFopU3FNFw7FFQkNX7Kq9oBujn4wNrpZiMuYXST4Uh0pNbSkuWm0psmlZI0IeKsbdKsjRT+NMFGFuKxWaCpjyjZYj7YvhFODypmOUDVMCkLE7SmGB0/eTxt3Ga58m6m/slrXK0UEDIacPdnLp+MejmsHN3AcdEUgSdIc4tjTItBqfhf+SWYdNPL43nJHqR+Z3/b80HBhkR1deRvFxc7M3kHgn4q0OsQ21unKxTEQMTC9rX1/WqSY3HI8tgboXEEAabHf6+isdTUxMBLrWG+yrEvaGPvjLcCOFhe93F1vuxtvu4uyjRLLg0E2yLtx2RhML547MdCwucOD8g1PR2nxSfslJN3Le8u5vAn7wHLXcJpRYrLiN3SN7unBsImm5lI/xXcW/ujTndO3MaBYAAcguaT+HoRj+yOi1vlPt/JbqXkdfgUJVW8jzGh9CErnxCRptmzjk7f0cNfe6mHyzpzw6paR+Fj7jiC4tA08gfirI1nhiHmVV8MmbLM5zQbta1jgRqDcutfiLEH1VzjZYs6NWaAGRGwSarbd1+qaX+SDcwarMCB5ILlV7H9RlCtAfr6FKnUGe7igFMUdno3RuDm/h1PK3G5VvnlbI241BFwUmrGiOEtH3njXyU+EvtGwcQL29UbDQrxGSyComB7234X+O4RuNg59t9UFBG5tn2Nt7/XyWQ/wiqaYeKJwFj9021BGot7fFZHibTG4NG1mjrfbRNa6mzFrxpsfQ6hVHCY9S7gSS3la5sfZMuEh1Tsta+p3DeF+bjxPwTWJrjugqQabA+6Pg32S2ZhkjrPafy2+CfvvbNfQ6j1Vc4pxT1Q7oA8Li+nNdGCVNo5v8iFpNGVx8CqtMxz5iAVZqqRpblzN9wleGUgZKXl7bDlurpqyDTotVBhfh1U/+zAoocdgDdyfRY7tDFwBPqB9VT0v2T8S/RX8dpQx1wo5D9mF1i+IMkOoLRwtqSgJcUitl8XwU5yTKQg0V/F7k6JK4uCtElVAb3YT6oc1UI1ETfiUllKE7KiS26xNTiZ4NHsFiNh8kEWIAbj9dQVIyqaTq1hH8IHxbZIjIbBdMlN0KMWFs0f+GLcw9wPsbq30Lm9zGDoSBZpIJy8LnyXlk0xylen4Yz7KIb2Yy/XwhFISbNVOSNj5NWloubbm3DruqvJjlU83Y5wANy10TtAOGdu3twVlrImOOTL7OcN+gIUEmHRjTKDpYk+I625+SYUrNXXvfpKHDckjxAjnbdL8UhY6neGSBxY4Oy3F9Lgm3kb+ibYxAO8tckiwuTpYaABuwHkkBdmcA4Am+jho4cteKDSY8W47Lf2OZaki/eaT7klN5X6ILBmBsMbQLAN0HqURMdFxS6z0I7VgFVKkdXJqmNY5JqooIcZdihd0p5yfJjR9Fe2u+S8/7GvID/8AiOV1bIbJn0iwp8iGfIou8ugppigYKfNZDmoPkBqhHyFcNddAJqVxcTxuup3uY+ny63d3ZFwLh/U6bgH0U1NHqkfbSoc2MOacpZJGWkcC11x8QtFbM3osuN0bmsMhyENLcwubhhNnO0FtBc7qKnhYJC3Uhw00GnMeSV4vO97Bd7/ENRmNjca3A0SZtZMAW967KRbhe3Iute3S6NL4apB+M4oQHFrvCPA3yvlB9kpoHt0tY26rmujDoXA/hs4eiHon7aD2T1oFUyz0pPIBHx35+yUUR6D2TRjjpt7KYWFM/RUWJ3Ed/wApv6HT52UsY31U08QdEQeIt7/+fgmg6Yklorv9pPA/FZ/auuvNK2yahYZV0kBi+rPNQOrCNkC6Rcd4iAZCsNt1A+a6Cc9cZitRgh0q4M+nRDvdooS5GjBBqFiELuixGjH/2Q==',
    width: 1,
    category: 'People',
  },
  {
    id: 9,
    uid: 'p3',
    backgroundColor: 'green',
    text: 'Trebam svog učitelja',
    title: 'Učitelj',
    image: 'https://www.spencerclarkegroup.co.uk/uploads/5005001.png',
    width: 1,
    category: 'People',
  },

  // Actions
  {
    id: 10,
    uid: 'a1',
    backgroundColor: 'blue',
    text: 'Želim sjesti',
    title: 'Sjesti',
    image:
      'https://resizer.myboardmaker.com/thumbnails/D3C6802056159DFC5E7B0429C39FC9CC.png?h=393&w=491',
    width: 1,
    category: 'Actions',
  },
  {
    id: 11,
    uid: 'a2',
    backgroundColor: 'blue',
    text: 'Hajde da igramo igru',
    title: 'Igrati',
    image: 'https://m.media-amazon.com/images/I/41broqOis2L.jpg',
    width: 1,
    category: 'Actions',
  },
  {
    id: 12,
    uid: 'a3',
    backgroundColor: 'blue',
    text: 'Spreman sam da trčim',
    title: 'Trčati',
    image:
      'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/01/Runner-training-on-running-track-1296x728-header-1296x728.jpg?w=1155&h=1528',
    width: 1,
    category: 'Actions',
  },

  // Social Interaction
  {
    id: 13,
    uid: 'si1',
    backgroundColor: 'violet',
    text: 'Molim te pomozi mi',
    title: 'Pomoć',
    image:
      'https://www.londonschool.com/media/filer_public/22/41/224154ea-b82e-4e53-b0fb-c2b183af6e7e/help.png',
    width: 1,
    category: 'Social Interaction',
  },
  {
    id: 14,
    uid: 'si2',
    backgroundColor: 'violet',
    text: 'Pozdrav',
    title: 'Zdravo',
    image:
      'https://t4.ftcdn.net/jpg/04/24/24/59/360_F_424245905_4jutEBKtnkf9TdqLJUcuKAPWmkMC1CRw.jpg',
    width: 1,
    category: 'Social Interaction',
  },
  {
    id: 15,
    uid: 'si3',
    backgroundColor: 'violet',
    text: 'Hvala ti puno',
    title: 'Hvala',
    image:
      'https://media.istockphoto.com/id/1397892955/photo/thank-you-message-for-card-presentation-business-expressing-gratitude-acknowledgment-and.jpg?s=612x612&w=0&k=20&c=7Lyf2sRAJnX_uiDy3ZEytmirul8pyJWm4l2fxiUtdvk=',
    width: 1,
    category: 'Social Interaction',
  },

  // Places
  {
    id: 16,
    uid: 'pl1',
    backgroundColor: 'pink',
    text: 'Želim ići kući',
    title: 'Kuća',
    image:
      'https://img.freepik.com/premium-vector/beautiful-home-clip-art-charming-cozy-house-vector-illustration-isolated-white_1167562-14965.jpg',
    width: 1,
    category: 'Places',
  },
  {
    id: 17,
    uid: 'pl2',
    backgroundColor: 'pink',
    text: 'Idemo u park',
    title: 'Park',
    image: 'https://ci.oakdale.mn.us/ImageRepository/Document?documentID=7445',
    width: 1,
    category: 'Places',
  },
  {
    id: 18,
    uid: 'pl3',
    backgroundColor: 'pink',
    text: 'Možemo li posjetiti prodavnicu?',
    title: 'Prodavnica',
    image:
      'https://c8.alamy.com/comp/G30BJC/markale-outdoor-market-sarajevo-bosnia-and-herzegovina-europe-G30BJC.jpg',
    width: 1,
    category: 'Places',
  },

  // Descriptive Words
  {
    id: 19,
    uid: 'dw1',
    backgroundColor: 'orange',
    text: 'Ovo je tako veliko',
    title: 'Veliko',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNshtaqyMeNrGBPNwJR8kuTk53rezl4niwXQ&s',
    width: 1,
    category: 'Descriptive Words',
  },
  {
    id: 20,
    uid: 'dw2',
    backgroundColor: 'orange',
    text: 'To je previše malo',
    title: 'Malo',
    image:
      'https://media.istockphoto.com/id/835288296/photo/hand-showing-size-gesture-isolated-on-white.jpg?s=612x612&w=0&k=20&c=v4R0E7GWcG77SNBTZICjOfnS3XSiVVodZREJrOz5tFg=',
    width: 1,
    category: 'Descriptive Words',
  },
  {
    id: 21,
    uid: 'dw3',
    backgroundColor: 'orange',
    text: 'Ovo je jako mekano',
    title: 'Mekano',
    image:
      'https://www.gbfoamdirect.co.uk/wp-content/uploads/2021/08/soft-foam.jpg',
    width: 1,
    category: 'Descriptive Words',
  },

  // Favorites
  {
    id: 22,
    uid: 'f1',
    backgroundColor: 'cyan',
    text: 'Volim sladoled',
    title: 'Sladoled',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjsO76hL4tNLp6ZN_j2m-CyGSpXmf88nzO0Q&s',
    width: 1,
    category: 'Favorites',
  },
  {
    id: 23,
    uid: 'f2',
    backgroundColor: 'cyan',
    text: 'Uživam igrati igre',
    title: 'Igre',
    image:
      'https://media.gq-magazine.co.uk/photos/645b5c3c8223a5c3801b8b26/16:9/w_2560%2Cc_limit/100-best-games-hp-b.jpg',
    width: 1,
    category: 'Favorites',
  },
  {
    id: 24,
    uid: 'f3',
    backgroundColor: 'cyan',
    text: 'Muzika mi je omiljena',
    title: 'Muzika',
    image:
      'https://moises.ai/_next/image/?url=https%3A%2F%2Fstorage.googleapis.com%2Fmoises-cms%2Fhow_to_reading_sheet_music_image_338d99b137%2Fhow_to_reading_sheet_music_image_338d99b137.jpg&w=1920&q=75',
    width: 1,
    category: 'Favorites',
  },
];

export default cardsData;
