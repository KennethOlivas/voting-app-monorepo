import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVoterDto } from '@voting-app/schemas';
import { ilike, or, count, SQL, asc, desc, AnyColumn, eq } from 'drizzle-orm';
import { db } from 'src/db';
import { voters } from 'src/db/schema';

@Injectable()
export class VotersService {
  async findAll(
    page: number,
    perPage: number,
    search?: string,
    sortBy: keyof typeof voters = 'createdAt',
    sortDirection: 'ASC' | 'DESC' = 'ASC',
  ) {
    console.log(page, perPage);
    const offset = (page - 1) * perPage;

    // Columnas permitidas para búsqueda
    const searchableColumns = [
      voters.lastName,
      voters.email,
      voters.dateOfBirth,
      voters.firstName,
      voters.middleName,
      voters.voterId,
      voters.city,
      voters.gender,
    ];

    // Validar que `sortBy` sea una columna válida
    const validSortColumns = [
      'lastName',
      'email',
      'dateOfBirth',
      'firstName',
      'middleName',
      'voterId',
      'city',
      'gender',
      'createdAt',
    ] as const;

    // Si `sortBy` no es válido, usamos `lastName` por defecto
    const isValidSortColumn = validSortColumns.includes(
      sortBy as (typeof validSortColumns)[number],
    );
    const sortColumn = (voters[sortBy] as AnyColumn) ?? voters.lastName;

    // Construcción de la condición `where`
    const whereClause: SQL<unknown> | undefined = search?.trim()
      ? or(...searchableColumns.map((column) => ilike(column, `%${search}%`)))
      : undefined;

    try {
      // Ejecutar ambas consultas en paralelo
      const [total, res] = await Promise.all([
        db
          .select({ count: count() })
          .from(voters)
          .where(whereClause ?? undefined),
        db
          .select()
          .from(voters)
          .where(whereClause ?? undefined)
          .orderBy(sortDirection === 'ASC' ? asc(sortColumn) : desc(sortColumn))
          .limit(perPage)
          .offset(offset),
      ]);

      return {
        data: res,
        totalPages: Math.ceil((total[0]?.count || 0) / perPage),
        page,
        perPage,
        sortBy: isValidSortColumn ? sortBy : 'createdAt',
        sortDirection,
      };
    } catch (error) {
      console.error('Error fetching voters:', error);
      throw new HttpException(
        'Failed to fetch voters',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: CreateVoterDto) {
    await db.insert(voters).values({ ...data });
    return { message: 'Voter created successfully', voter: data };
  }

  async findOne(id: string) {
    return await db.query.voters.findFirst({
      where: eq(voters.id, id),
    });
  }

  async update(id: string, data: CreateVoterDto) {
    await db
      .update(voters)
      .set({ ...data })
      .where(eq(voters.id, id));

    return { message: 'Voter updated successfully', voter: data };
  }
}
