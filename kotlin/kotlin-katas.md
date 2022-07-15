Notes from doing Kotlin katas and coding pratice:

Convert types to Int:
    toString().toInt()
or even more succinct:
    "$it".toInt()

list.sumOf { /* convert to int */ } vs list.map{...}.sum()

char to int:
    c.code  // ascii code