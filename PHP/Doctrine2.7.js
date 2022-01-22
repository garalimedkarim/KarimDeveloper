

#Working with Objects:
	https://www.doctrine-project.org/projects/doctrine-orm/en/2.7/reference/working-with-objects.html
	#cascade Vs onDelete:
		 exple:
			 * @ORM\ManyToOne(targetEntity="Yoda\UserBundle\Entity\User", cascade={"remove"}) //cascade => when current entity deleted, we cascade delete
			 * @ORM\JoinColumn(onDelete="CASCADE") // onDelete => when the $owner is deleted, we cascade delete
			 */
			protected $owner;		 
		 
	#EntityManager#close()
		A Unit of Work can be manually closed by calling EntityManager#close(). 
		Any changes to objects within this Unit of Work that have not yet been persisted are lost.
		When EntityManager#clear() is invoked, all entities that are currently managed by the EntityManager instance become detached.

	#Merge & Detach:
		EntityManager#detach($entity)
		EntityManager#merge($entity)
		
#Working with associations:
	https://www.doctrine-project.org/projects/doctrine-orm/en/2.7/reference/working-with-associations.html#working-with-associations


#Symfony::DoctrineBundle
	https://symfony.com/doc/current/bundles/DoctrineBundle/index.html
